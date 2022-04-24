
taskNote = {
    Text: "",
    PieceType: "Note"
};

taskChecklistItem = {
    Text: "",
    Completed: false,
};

taskChecklist = {
    Title: "",
    Items: [],
    PieceType: "Checklist"
};

rawTask = {
    Title: "",
    Text: "",
    Pieces: [],
    Completed: false,
    Priority: ""
};

rawCatagory = {
    Title: "",
    Tasks: [],
};

saveType = {
    BoardTitle: "",
    Theme: 0,
    Catagories: [],
};

const NotePieceType = "Note";
const ChecklistPieceType = "Checklist";



function SaveData()
{
    var title = document.body.querySelector("#board_title").value;

    if (title == undefined || title == null) title = "";

    var final = { Catagories: [], BoardTitle: title, Theme: selectedTheme };

    var cats = GetCatagoryParent().querySelectorAll(
        ".catagory:not(#catagory_root)"
    );

    if (cats != null && cats.length > 0)
    {
        cats.forEach((catagory) =>
        {
            var tasks = catagory.querySelectorAll(".task");
            var rawCat = {
                Title: catagory.querySelector(".catagory_title").value,
                Tasks: [],
            };

            tasks.forEach((task) =>
            {
                var rawTask = {
                    Title: task.querySelector(".task_title").value,
                    Text: task.querySelector(".task_text").value,
                    Priority: task.dataset.priority,
                    Completed: task.classList.contains("done"),
                    Pieces: []
                };

                var piecesParent = task.querySelector(".task_pieces_parent");
                var pieces = piecesParent.querySelectorAll(".task_piece");

                pieces.forEach(piece =>
                {
                    if (piece.matches(".task_piece_note"))
                    {
                        var rawPiece = {
                            Text: piece.querySelector(".task_note_text").value,
                            PieceType: NotePieceType
                        };
                        rawTask.Pieces.push(rawPiece);
                    }
                    else if (piece.matches(".task_piece_checklist"))
                    {
                        var rawPiece = { Title: piece.querySelector('.task_checklist_title').value, Items: [], PieceType: ChecklistPieceType };

                        piece.querySelectorAll('.task_checklist_item').forEach(item =>
                        {
                            rawPiece.Items.push({ Text: item.querySelector('.task_checklist_text').value, Completed: item.matches('.done') });
                        });
                        rawTask.Pieces.push(rawPiece);
                    }
                });

                rawCat.Tasks.push(rawTask);
            });

            final.Catagories.push(rawCat);
        });
    }

    console.log(final);

    var stringData = JSON.stringify(final);
    localStorage.setItem("savedata", stringData);
    return stringData;
}

function LoadData(override = null)
{
    var data = null;

    if (override == null)
    {
        data = JSON.parse(localStorage.getItem("savedata"));
    } else
    {
        data = override;
    }

    SetColourTheme(data.Theme);

    document.head.querySelector("#page_title").innerText = data.BoardTitle;
    document.body.querySelector("#board_title").value = data.BoardTitle;

    data.Catagories.forEach((catagory) =>
    {
        var catElem = CreateCatagory(catagory.Title);

        catagory.Tasks.forEach((task) =>
        {
            var element = CreateTask(catElem);
            SetTaskInfo(
                element,
                task.Title,
                task.Text,
                task.Priority,
                task.Completed,
                task.Pieces
            );
        });
    });
}

function LoadFromFile()
{
    console.log("Loading from file");
    const element = document.querySelector("#upload_input");
    let files = element.files;

    if (files.length == 0) return;

    const file = files[0];

    let reader = new FileReader();
    reader.onload = (e) =>
    {
        const file = e.target.result;
        LoadData(JSON.parse(file));
    };

    reader.readAsText(file);
}

function SaveToFile(filename, data)
{
    const element = document.createElement("a");
    const dataBlob = new Blob([data], { type: "plain/text" });
    const fileUrl = URL.createObjectURL(dataBlob);

    element.setAttribute("href", fileUrl);
    element.setAttribute("download", filename);
    element.style.display = "none";

    document.body.append(element);
    element.click();
    document.body.removeChild(element);
}

function SetTaskInfo(task, title, text, priority, completed, pieces)
{
    if (completed)
    {
        task.classList.add("done");
        task.querySelector(".task_completed_checkbox").checked = true;
    }
    task.querySelector(".task_title").value = title;
    task.querySelector(".task_text").value = text;
    UpdatePriority(task, priority);

    console.log("loading pieces: ", pieces);

    if (pieces)
    {
        pieces.forEach(piece =>
        {
            if (piece.PieceType == ChecklistPieceType)
            {
                AddTaskChecklist(task, piece.Title, piece.Items);
            }
            else if (piece.PieceType == NotePieceType)
            {
                AddTaskNote(task, piece.Text);
            }
        });
    }
}