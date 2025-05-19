function goToResultPage() {
    const ip = document.getElementById('ipInput').value.trim();
    if (ip) {
        window.location.href = `result.html?ip=${encodeURIComponent(ip)}`;
    } else {
        alert("Please enter an IP address.");
    }
}

function loadFlag() {
    const glider = document.getElementById('flagGlider');
    const countryCodes = `
        AD AE AF AG AI AL AM AN AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BM BN BO BR BS BT BW BY BZ 
        CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET 
        FI FJ FK FM FO FR GA GB GD GE GG GH GI GL GM GN GQ GR GS GT GU GW GY HK HN HR HT HU ID IE IL IM IN IQ IR IS IT 
        JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO 
        MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PN PR PS PT PW PY QA RE 
        RO RS RU RW SA SB SC SD SE SG SH SI SK SL SM SN SO SR SS ST SV SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ 
        UA UG US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW
        `.match(/\b[A-Z]{2}\b/g);

    for (let i = 0; i < 100; i++) {
        const code = countryCodes[Math.floor(Math.random() * countryCodes.length)];
        const img = document.createElement('img');
        img.src = `https://flagsapi.com/${code}/shiny/64.png`;
        img.alt = code;
        glider.appendChild(img);
    }

    let scrollPos = 0;
    function autoScroll() {
        scrollPos += 0.5;
        if (scrollPos >= glider.scrollWidth - glider.clientWidth) {
            scrollPos = 0;
        }
        glider.scrollLeft = scrollPos;
        requestAnimationFrame(autoScroll);
    }

    requestAnimationFrame(autoScroll);
};

window.onload = loadFlag;