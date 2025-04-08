#! /bin/bash
BRed='\033[1;31m'
NC='\033[0m' # No Color
On_Purple='\033[45m'
BPurple='\033[1;35m'

echo -e "${BRed}Hello :) You are about to start on the first part of the Exygy Front End Interview${NC}\n"
echo "Let's set everything up..."
echo "Please type the first two letters of your first name and first two letters of your last name. For example, Johnny Appleseed would type JoAp."

read initials

while true; do
    echo -e "\nYou've inputted: ${On_Purple}$initials${NC}. \n"
    read -p "Does that look right? " yn
    case $yn in
        [Yy]* ) echo -e "\nCreating branch and pushing to origin..."; git checkout -b $initials; git push --set-upstream origin $initials; break;;
        [Nn]* ) read -p "Okay! No worries. Please type it again " initials exit;;
        * ) echo "Please answer y or n.";;
    esac
done

echo -e "You are all set up. \nPlease remember to push your changes to your branch at the end of the interview."

echo -e "${BPurple}Good luck <3${NC}"

