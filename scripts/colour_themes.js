const themes =
    [
        {
            Name: "Dark Purple",
            Col1: "#0A0D1A",
            Col2: "#1F1F33",
            Col3: "#1A1122",
            Col4: "#2B1D39",
            Col5: "#5B5364",

            TextCol1: "#637e91",
            TextCol2: "#97D4FC",
            TextCol3: "#e4f4ff",
        },
        {
            Name: "Ocean",
            Col1: "#03045E",
            Col2: "#023E8A",
            Col3: "#0077B6",
            Col4: "#0096C7",
            Col5: "#00B4D8",

            TextCol1: "#48CAE4",
            TextCol2: "#90E0EF",
            TextCol3: "#CAF0F8",
        },
        {
            Name: "Inferno",
            Col1: "#9D0208",
            Col2: "#DC2F02",
            Col3: "#F48C06",
            Col4: "#FAA307",
            Col5: "#FFBA08",

            TextCol1: "#6A040F",
            TextCol2: "#370617",
            TextCol3: "#03071E",
        },
        {
            Name: "Mossy Slate",
            Col1: "#081C15",
            Col2: "#1B4332",
            Col3: "#2D6A4F",
            Col4: "#40916C",
            Col5: "#52B788",

            TextCol1: "#95D5B2",
            TextCol2: "#B7E4C7",
            TextCol3: "#D8F3DC",
        },
        {
            Name: "Vaporwave",
            Col1: "#2D00F7",
            Col2: "#6A00F4",
            Col3: "#8900F2",
            Col4: "#A100F2",
            Col5: "#B100E8",

            TextCol1: "#7A007A",
            TextCol2: "#DB00B6",
            TextCol3: "#E500A4",
        },
        {
            Name: "Sterile (Light)",
            Col1: "#F8F9FA",
            Col2: "#DEE2E6",
            Col3: "#CED4DA",
            Col4: "#ADB5BD",
            Col5: "#8D959D",

            TextCol1: "#495057",
            TextCol2: "#343A40",
            TextCol3: "#212529",
        },
        {
            Name: "Sterile (Dark)",
            Col1: "#212529",
            Col2: "#495057",
            Col3: "#6C757D",
            Col4: "#8D959D",
            Col5: "#ADB5BD",

            TextCol1: "#CED4DA",
            TextCol2: "#DEE2E6",
            TextCol3: "#F8F9FA",
        }
    ];

var selectedTheme = 0;

var root = document.querySelector(':root');
SetupThemeElements();

function SetupThemeElements()
{
    const parent = document.querySelector('#theme_parent');
    const childTemplate = parent.querySelector('#theme_child');

    for (let index = 0; index < themes.length; index++)
    {
        const theme = themes[index];

        var child = childTemplate.cloneNode(true);
        child.id = '';
        child.innerText = theme.Name;
        child.addEventListener('click', function ()
        {
            SetColourTheme(index);
        });
        parent.appendChild(child);
    }
}


function GetColourThemes()
{
    return themes;
}

function SetColourTheme(themeIndex)
{
    if (themeIndex == undefined || themeIndex == null) themeIndex = 0;

    selectedTheme = themeIndex;

    root.style.setProperty('--colour1', themes[selectedTheme].Col1);
    root.style.setProperty('--colour2', themes[selectedTheme].Col2);
    root.style.setProperty('--colour3', themes[selectedTheme].Col3);
    root.style.setProperty('--colour4', themes[selectedTheme].Col4);
    root.style.setProperty('--colour5', themes[selectedTheme].Col5);

    root.style.setProperty('--text_colour1', themes[selectedTheme].TextCol1);
    root.style.setProperty('--text_colour2', themes[selectedTheme].TextCol2);
    root.style.setProperty('--text_colour3', themes[selectedTheme].TextCol3);

    console.log("Setting theme: ", themeIndex);
}