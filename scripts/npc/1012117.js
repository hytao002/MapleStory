/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/* 	
	NPC Name: 		Big Headward
        Map(s): 		Victoria Road : Henesys Hair Salon (100000104)
	Description: 		Random haircut
*/

var status = 0;
var mhair = Array(30130, 35350, 35050, 35340, 30330, 32410, 32390);
var fhair = Array(31610, 38420, 34270, 34940, 34750, 38440, 37560);
var hairnew = Array();

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            cm.dispose();
            return;
        }
        
        if (mode == 1)
            status++;
        else
            status--;
        
        if (status == 0) {
            cm.sendSimple("If you use this regular coupon, your hair may transform into a random new look...do you still want to do it using #b#t5150040##k, I will do it anyways for you. But don't forget, it will be random!\r\n\#L2#OK! (Uses #i5150040# #t5150040#)#l");
        } else if (status == 1) {
            cm.sendYesNo("If you use the EXP coupon your hair will change RANDOMLY with a chance to obtain a new experimental style that even you didn't think was possible. Are you going to use #b#t5150040##k and really change your hairstyle?");
        }
        else if (status == 2) {
            if (cm.haveItem(5150040) == true){
                hairnew = Array();
                if (cm.getPlayer().getGender() == 0) {
                    for(var i = 0; i < mhair.length; i++) {
                        hairnew.push(mhair[i] + parseInt(cm.getPlayer().getHair() % 10));
                    }
                }
                else {
                    for(var i = 0; i < fhair.length; i++) {
                        hairnew.push(fhair[i] + parseInt(cm.getPlayer().getHair() % 10));
                    }
                }
                
                cm.gainItem(5150040, -1);
                var newHairId;

       			do{ // Makes sure the hair salon actually changes your hair.
       				newHairId = hairnew[Math.floor(Math.random() * hairnew.length)]
       			} while (newHairId == cm.getPlayer().getHair());

                cm.setHair(newHairId);
                cm.sendOk("Enjoy your new and improved hairstyle!");
            } else {
                cm.sendOk("Hmmm...it looks like you don't have our designated coupon...I'm afraid I can't give you a haircut without it. I'm sorry...");
            }
            
            cm.dispose();
        }
    }
}
