let StatPage = {
    groupDisplayNames: [
        'The Order', 'Fundamentals', 'Combat', 'Magic', 'Dark Magic'
    ],
    groupHTMLNames: [
        'theorder', 'fundamentals', 'combat', 'magic', 'darkmagic'
    ],
    baseHTML: `
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse"
                    data-bs-target="#skills_GROUPNAME" aria-expanded="true" aria-controls="skills_GROUPNAME">
                    SKILLHEADER
                </button>
            </h2>
            <div id="skills_GROUPNAME" class="accordion-collapse collapse show">
                <div class="accordion-body">
                    THESKILLS
                </div>
            </div>
        </div>
    `,

    skillHTML: `
        <div class="row g-3 align-items-center">
            <div class="col">
                <label for="SKILLNAME_skill_level" class="col-form-label">HTMLSKILLNAME: Skill Level</label>
            </div>
            <div class="col">
                <input type="number" id="SKILLNAME_skill_level" class="form-control" value="1" onchange="updateSkill('SKILLNAME')">
            </div>

            <div class="col">
                <label for="SKILLNAME_relic_level" class="col-form-label">Relic Level</label>
            </div>
            <div class="col">
                <input type="number" id="SKILLNAME_relic_level" class="form-control" value="1" onchange="updateSkill('SKILLNAME')">
            </div>

            <div class="col">
                <span class="col-form-label">Skill effect <span id="SKILLNAME_skill_effect">SKILL_EFFECT</span></span>
            </div>

            <div class="col">
                <span class="col-form-label">Skill cost <span id="SKILLNAME_skill_cost">1c</span></span>
            </div>
        </div>
    `,

    skills: {
        theorder: ['faith', 'zeal', 'devotion', 'fervour'],
        fundamentals: ['productivity', 'concentration', 'bargaining', 'meditation'],
        combat: ['strength', 'battletactics', 'musclememory'],
        magic: ['manacontrol', 'lifeessence', 'resiliance', 'materialism'],
        darkmagic: ['fanaticaldevotion', 'ardentbelief', 'zealousconviction', 'extremepiety', 'absolutefaith', 'devoutmastery', 'doggedperseverance', 'blazingfervour']
    },

    translateSkillName: (name) => {
        switch (name) {
            case "faith": return "Faith";
            case "zeal": return "Zeal";
            case "devotion": return "Devotion";
            case "fervour": return "Fervour";

            case "productivity": return "Productivity";
            case "concentration": return "Concentration";
            case "bargaining": return "Bargaining";
            case "meditation": return "Meditation";
            
            case "strength": return "Strength";
            case "battletactics": return "Battle Bactics";
            case "musclememory": return "Muscle Memory";

            case "manacontrol": return "Mana Control";
            case "lifeessence": return "Life Essence";
            case "resiliance": return "Resiliance";
            case "materialism": return "Materialism";

            case "fanaticaldevotion": return "Fanatical Devotion";
            case "ardentbelief": return "Ardent Belief";
            case "zealousconviction": return "Zealous Conviction";
            case "extremepiety": return "Extreme Piety";
            case "absolutefaith": return "Absolite Faith";
            case "devoutmastery": return "Devout Mastery";
            case "doggedperseverance": return "Dogged Perseverance";
            case "blazingfervour": return "Blazing Fervour";
        }
    },

    init: () => {
        let groupDisplayNames = [
            'The Order', 'Fundamentals', 'Combat', 'Magic', 'Dark Magic'
        ];
        let groupHTMLNames = [
            'theorder', 'fundamentals', 'combat', 'magic', 'darkmagic'
        ];
        let totalSkillHtml = '';

        for (let gCount = 0; gCount < groupDisplayNames.length; gCount++) {
            let outerHTML = StatPage.baseHTML;
            outerHTML = outerHTML.replaceAll("SKILLHEADER", groupDisplayNames[gCount]);
            outerHTML = outerHTML.replaceAll("GROUPNAME", groupHTMLNames[gCount]);

            let groupSkillHTML = '';
            for (let skillCount = 0; skillCount < StatPage.skills[groupHTMLNames[gCount]].length; skillCount++) {
                let thisSkillHtml = StatPage.skillHTML;
                thisSkillHtml = thisSkillHtml.replaceAll('HTMLSKILLNAME', StatPage.translateSkillName(StatPage.skills[groupHTMLNames[gCount]][skillCount]));
                thisSkillHtml = thisSkillHtml.replaceAll('SKILL_EFFECT', skillEffects[groupHTMLNames[gCount]][StatPage.skills[groupHTMLNames[gCount]][skillCount]]);
                thisSkillHtml = thisSkillHtml.replaceAll('SKILLNAME', StatPage.skills[groupHTMLNames[gCount]][skillCount]);

                groupSkillHTML += thisSkillHtml;
            }
            outerHTML = outerHTML.replaceAll("THESKILLS", groupSkillHTML);
            totalSkillHtml += outerHTML;
            outerHTML = '';
        }
        jQuery("#skillsAccordian").append(totalSkillHtml);
    },

    import: (playerid) => {
        _import.go(playerid)

        let stats =_import.stats;

        jQuery("#current_fana").text(parseFloat(stats.fanaticism).toLocaleString());
        jQuery("#total_brands").text(parseFloat(stats.brands).toLocaleString());
        jQuery("#relic_touches").text(parseFloat(stats.relictouches).toLocaleString());

        for (group = 0; group < StatPage.groupHTMLNames.length; group++) {
            for (skill = 0; skill < StatPage.skills[StatPage.groupHTMLNames[group]].length; skill++) {
                jQuery(`#${StatPage.skills[skill]}_skill_level`).val(stats.skills[StatPage.groupHTMLNames[group]][skill].level);
                jQuery(`#${StatPage.skills[skill]}_relic_level`).val(stats.skills[StatPage.groupHTMLNames[group]][skill].reliclevel);
                jQuery(`#${StatPage.skills[skill]}_skill_effect`).text(getEffect(1*skillEffects[group][skill], 1*stats[group][skill].level, 1*stats.playerStats.skilleffects, false));
                updateSkill(skill);
            }
        }
    }
}