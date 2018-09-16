Gnome Fortress
==============

![Multi-Gnome](./multi-gnome.jpg)

A fortress has been randomly filled with gnomes. You are tasked with
simulating their behavior. The gnomes belong to different groups and the
different groups are viciously hostile to each other.

You are given the floor plan to the fortress:

Each character represents a tile, if the character is '#' it is considered a
wall tile and if the characters is not a '#' it is to be  considered a corridor
tile.

For example:

     #######################
        #  #   #  #  #  #  #
     #  # a#   #  #  #  #  #
     #  #      #     # b   #
     #  ####   #  #  #  #  #
     #  #  #   #  #  #  #  #
     #     #   #  #  #    ##
     #  x                  #
     #######################


The gnomes in this fortress move in random directions one space at a time, in
one of the four cardinal directions: North South East West.

You should create N groups of M gnomes where N and M are specified as
command line arguments.  For example, two groups of ten gnomes each.

These gnomes each start out on a random corridor tile in the fortress,
they are only capable of moving onto other corridor tiles. At each iteration of
your simulation the gnomes can move into any other adjacent non-wall space at
random. (They cannot travel diagonally, or through walls).

Each gnome has a strength value. When any gnome meet, if they are from
the same group of gnome they combine into one larger gnome with a
strength value equal to the total of those gnomes. If they are
different types of gnome, only the gnome with the greatest strength value
survives.

Challenge
---------

You should create a program that reads in a floor plan, creates N groups of
M gnome and starts the battle. The program should run until there is a lone
victor. When gnomes meet you should print out a message like:


    gnome 1 from team 2, gnome 2 from team 2 have met at (2,4) and combined into a strength 5 gnome.
    gnome 1 from team 2, gnome 4 from team 3 have fought at (7,3) and gnome 1 from team 2 was victorious.


Feel free to make assumptions, but please add comments or notes describing
those assumptions.

Technical requirements
----------------------

* You are free to use any language. We use Scala.
* Clean, modular code.
* Tests to verify your code.

Extra
-----

The fortress walls are defined only in terms of the # character. Above, it was
assumed that other characters were simply all corridor tiles, however in the
example the characters ' ' 'a' 'b' and 'x' are also available.

If you have time, define some other interesting behaviors or effects for the
non-white-space characters.

Some ideas:

* Breakable walls.
* Loot / Strength potions.
* One way corridors.
* Teleport tile pairs.
