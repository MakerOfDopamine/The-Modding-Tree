addLayer("p", {
        name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
        symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
        position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
        startData() { return {
            unlocked: true,
			points: new Decimal(0),
        }},
        color: "#00bfbf",
        requires: new Decimal(10), // Can be a function that takes requirement increases into account
        resource: "Prestige Points", // Name of prestige currency
        baseResource: "points", // Name of resource prestige is based on
        baseAmount() {return player.points}, // Get the current amount of baseResource
        type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        exponent: 0.5, // Prestige currency exponent
        gainMult() { // Calculate the multiplier for main currency from bonuses
            mult = new Decimal(1)
            let upg24 = upgradeEffect("p",24)
            if (hasUpgrade("p",24)) mult = mult.times(upg24)
            return mult
        },
        gainExp() { // Calculate the exponent on main currency from bonuses
            return new Decimal(1)
        },
        row: 0, // Row the layer is in on the tree (0 is the first row)
        hotkeys: [
            {key: "p", description: "Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
        ],
        layerShown(){return true},
        upgrades: {
            rows: 7,
            cols: 7,
            11: {
                title: "Start Working",
                description: "Generate 1 Point per second.",
                cost: new Decimal(1),
            },
            12: {
                title: "Work slightly harder",
                description: "Double your point gain.",
                cost: new Decimal(1),
                unlocked() {
                    return hasUpgrade("p",11)
                }
            },
            13: {
                title: "Work harder",
                description: "Double your point gain again.",
                cost: new Decimal(1),
                unlocked() {
                    return hasUpgrade("p",12)
                }
            },
            14: {
                title: "Working really hard",
                description: "Double your point gain, again.",
                cost: new Decimal(2),
                unlocked() {
                    return hasUpgrade("p",13)
                }
            },
            15: {
                title: "Overwork",
                description: "Double your point gain yet again.",
                cost: new Decimal(3),
                unlocked() {
                    return hasUpgrade("p",14)
                }
            },
            16: {
                title: "All-Nighter",
                description: "Double your point gain, yet again.",
                cost: new Decimal(5),
                unlocked() {
                    return hasUpgrade("p",15)
                }
            },
            17: {
                title: "Work, Work, Work!",
                description: "Double your point gain, for the final time.",
                cost: new Decimal(10),
                unlocked() {
                    return hasUpgrade("p",16)
                }
            },
            21: {
                title: "Motivation",
                description: "Gain more points based on your current points.",
                cost: new Decimal(10),
                unlocked() {
                    return hasUpgrade("p",11)
                },
                effect() {
                    let normal = player.points.max(1).log10().pow(2).add(1)
                    let upg23 = player.points.max(1).ln().pow(3).add(1)
                    return hasUpgrade("p",23) ? upg23 : normal
                },
                effectDisplay() {
                    return format(upgradeEffect("p",21),3)
                }
            },
            22: {
                title: "Determination",
                description: "Gain more points based on your prestige points.",
                cost: new Decimal(20),
                unlocked() {
                    return hasUpgrade("p",12) && hasUpgrade("p",21)
                },
                effect() {
                    return player.p.points.sqrt().add(1)
                },
                effectDisplay() {
                    return format(upgradeEffect("p",22),3)
                }
            },
            23: {
                title: "Refactorisation",
                description: "Motivation has a better formula.",
                cost: new Decimal(100),
                unlocked() {
                    return hasUpgrade("p",13) && hasUpgrade("p",22)
                },
            },
            24: {
                title: "Improvisation",
                description: "All upgrade triple instead of double production.",
                cost: new Decimal("1e4"),
                unlocked() {
                    return hasUpgrade("p",14) && hasUpgrade("p",23) 
                }
            },
            24: {
                title: "Imagination",
                description: "Gain more Prestige points based on your current points.",
                cost: new Decimal("1e5"),
                unlocked() {
                    return hasUpgrade("p",15) && hasUpgrade("p",24) 
                },
                effect() {
                    return player.points.max(1).log10().pow(2).add(1)
                },
                effectDisplay() {
                    return format(upgradeEffect("p",24),3)
                }
            },
        }
})
