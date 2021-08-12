const { BehaviorTree, Sequence, Selector, Task, SUCCESS, FAILURE, Decorator } = require('behaviortree');

class Repeat extends Decorator {
  constructor(args) {
    super(args);
  }

  setConfig ({ loop = Infinity }) {
    this.config = {
      loop
    };
  }
  decorate(run) {
    let i = 0;
    let result = FAILURE;
    while (i++ < this.config.loop) {
      result = run();
      if (result !== FAILURE) {
        return result;
      }
    }
    return FAILURE;
  }
}

const absolute = value => value >= 0 ? Math.min(value, 1) : Math.max(value, -1);

BehaviorTree.register('hasAdjacentTeammate', new Task({
  run: function (gnome) {
    console.log('hasAdjacentTeammate', gnome.id);
    if (gnome.getGnomesFromEnvironment().find(g => g.team === gnome.team)) {
      return SUCCESS;
    }
    return FAILURE;
  }
}));

BehaviorTree.register('hasAdjacentEnemy', new Task({
  run: function (gnome) {
    console.log('hasAdjacentEnemy');
    if (gnome.getGnomesFromEnvironment().find(g => g.team !== gnome.team)) {
      return SUCCESS;
    }
    return FAILURE;
  }
}));

BehaviorTree.register('attackAdjacentEnemy', new Task({
  run: function (gnome) {
    console.log('Attack!');
    // throw new Error();
    const enemy = gnome.getGnomesFromEnvironment().find(g => g.team !== gnome.team);
    const newDirection = [enemy.position[0] - gnome.position[0], enemy.position[1] - gnome.position[1]];
    gnome.direction = newDirection;
    return SUCCESS;
  }
}));

BehaviorTree.register('mergeAdjacentTeammate', new Task({
  run: function (gnome) {
    console.log('Merge!');
    const teammate = gnome.getGnomesFromEnvironment().find(g => g.team === gnome.team);
    const newDirection = [teammate.position[0] - gnome.position[0], teammate.position[1] - gnome.position[1]];
    gnome.direction = newDirection;
    return SUCCESS;
  }
}));

BehaviorTree.register('setRandomDirection', new Task({
  run: function (gnome) {
    const directions = {
      0: [1, 0],  //north
      1: [-1, 0],  //south
      2: [0, 1],  //east
      3: [0, -1],  //west
    };
    if (gnome.team === 'beasts') {
      console.log('setRandomDirection');
    }
    const direction = directions[Math.floor(Math.random() * 4)];
    gnome.direction = direction;
    return SUCCESS;
  }
}));


BehaviorTree.register('hasDirection', new Task({
  run: function (gnome) {
    if (gnome.direction[0] === 0 && gnome.direction[1] === 0) {
      return FAILURE;
    }
    return SUCCESS;
  }
}));

BehaviorTree.register('notHeadingIntoWall', new Task({
  run: function (gnome) {

    const los = gnome.currentEnvironment.length;
    const middle = Math.floor(los / 2) + los%2 -1 ;

    const destinationY = middle + absolute(gnome.direction[0]) * gnome.moveSpeed;
    const destinationX = middle + absolute(gnome.direction[1]) * gnome.moveSpeed;
    // console.log('notHeadingIntoWall', gnome.id, gnome.currentEnvironment[destinationY][destinationX] === '#');
    if (gnome.currentEnvironment[destinationY][destinationX] === '#') {
      return FAILURE;
    };

    return SUCCESS;
  }
}));


BehaviorTree.register('setRandomWalkableDirection', new Sequence({ nodes:
  [
    'setRandomDirection',
    'notHeadingIntoWall'
  ]
}));

BehaviorTree.register('findWalkableDirection', new Repeat({ node: 'setRandomWalkableDirection' }));

BehaviorTree.register('teamUp', new Sequence({ nodes:
  [
    'hasAdjacentTeammate',
    'mergeAdjacentTeammate',
    'notHeadingIntoWall'
  ]
}));

BehaviorTree.register('attackEnemy', new Sequence({ nodes:
  [
    'hasAdjacentEnemy',
    'attackAdjacentEnemy',
    'notHeadingIntoWall'
  ]
}));

// -------------

BehaviorTree.register('headForwards', new Sequence({ nodes:
  [
    'notHeadingIntoWall',
    'hasDirection'
  ]
}));

BehaviorTree.register('keepGoingUntillWall', new Selector({  nodes:
  [
    'headForwards',
    'findWalkableDirection'
  ]
}));

BehaviorTree.register('pragmaticBehaviour', new Selector({ nodes:
  [
    'teamUp',
    'attackEnemy'
  ]
}));

BehaviorTree.register('proactive', new Selector({ nodes:
  [
    'pragmaticBehaviour',
    'keepGoingUntillWall',
    'findWalkableDirection'
  ]
}));


module.exports = {
  setBehaviourTreeForGnome: (gnome, tree) => {
    const bTree = new BehaviorTree({
      tree: tree,
      blackboard: gnome
    });
    return bTree;
  },
  absolute
};

