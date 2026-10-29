import { world } from "@minecraft/server";

//Tier to balance the food effect base on how hard to obtain the item resource
//Tier 1: Easy, can find it by traveling 4800t 4m 0a
//Tier 2: L.Medium, can find it by grinding 6000t 5m 0a
//Tier 3: Medium, can find it but danger 6600t 5.5m 1a

const food_effects = {
    "food:glowfish": { effect: "night_vision", duration: 4800, amplifier: 0 }, //1
    "food:golden_berries": { effect: "haste", duration: 5400, amplifier: 1 }, //2
    "food:fire_fused_apple": { effect: "fire_resistance", duration: 7200, amplifier: 0 }, //3
    "food:feather_in_potato": { effect: "slow_falling", duration: 6000, amplifier: 0 }, //3
    "food:pufferslime": { effect: "water_breathing", duration: 6000, amplifier: 0 }, //2
    "food:paper_bread": { effect: "regeneration", duration: 4800, amplifier: 1 }, //2
    "food:blazed_melon": { effect: "speed", duration: 6600, amplifier: 1 }, //3
    "food:bone_with_carrot": { effect: "strength", duration: 5400, amplifier: 1 } //3
};

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

world.afterEvents.itemCompleteUse.subscribe(function (event) {
    if (event.itemStack.typeId == "food:glowroot") { //3
        const effects = event.source.getEffects();
        for (let effect of effects) {
            event.source.addEffect(
                effect.typeId,
                effect.duration,
                {
                    amplifier: Math.min(effect.amplifier + random(1, 2), 9),
                    showParticles: false
                }
            );
        };
        return;
    };
    if (event.itemStack.typeId == "food:redstone_potato") { //3
        const effects = event.source.getEffects();
        for (let effect of effects) {
            event.source.addEffect(
                effect.typeId,
                Math.min(effect.duration + (3000 * random(1, 3)), 36000),
                {
                    amplifier: effect.amplifier,
                    showParticles: false
                }
            );
        };
        return;
    };
    const food_effect = food_effects[event.itemStack.typeId];
    if (!food_effect) return;
    try {
        event.source.addEffect(
            food_effect.effect,
            food_effect.duration,
            {
                amplifier: food_effect.amplifier,
                showParticles: false
            }
        );
    } catch (error) { };
})