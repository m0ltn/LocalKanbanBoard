function GetTaskTemplate()
{
    return templateParent.querySelector('#task_template').children[0].cloneNode(true);
}

function GetClosestTask(element)
{
    return GetClosestParent(element, ".task");
}

const NoPriority = "no_priority";
const LowPriority = "low_priority";
const MedPriority = "med_priority";
const HighPriority = "high_priority";

//Creation/Deletion

function DeleteTask(element)
{
    if (element.matches(".task"))
    {
        AnimateElement(element, 'fade_out', true);
    }
}

function CreateTask(catagory)
{
    var task = GetTaskTemplate();
    AnimateElement(task, 'fade_in', false);

    UpdatePriority(task, NoPriority);

    task.addEventListener("dragstart", DragStartTask);
    task.addEventListener("drag", Drag);
    task.addEventListener("dragend", DragEndTask);

    task.addEventListener("dragenter", DragEnter);
    task.addEventListener("dragover", DragOverTask);
    task.addEventListener("dragleave", DragLeave);

    var taskParent = catagory.querySelector(".task_parent");

    taskParent.appendChild(task);
    return task;
}

//Priority

function UpdatePriority(task, priority)
{
    if (priority == undefined || priority == null || priority == "")
    {
        priority = NoPriority;
    }
    task.dataset.priority = priority;

    var tag = task.querySelector(".task_priority_tag");

    tag.classList.remove(NoPriority);
    tag.classList.remove(LowPriority);
    tag.classList.remove(MedPriority);
    tag.classList.remove(HighPriority);

    tag.classList.add(priority);
}

function ResetPriority(task)
{
    UpdatePriority(task, task.dataset.priority);
}

function SetPriorityVisual(element)
{
    var task = GetClosestTask(element);
    var tag = task.querySelector(".task_priority_tag");

    tag.classList.remove(NoPriority);
    tag.classList.remove(LowPriority);
    tag.classList.remove(MedPriority);
    tag.classList.remove(HighPriority);

    tag.classList.add(element.classList[0]);
}




function SetTaskFinished(checkmark)
{
    const task = GetClosestTask(checkmark);

    if (checkmark.checked)
    {
        task.classList.add("done");
    } else
    {
        task.classList.remove("done");
    }
}

//Pieces

function GetTaskPieceParent(task)
{
    return task.querySelector(".task_pieces_parent");
}

function AddTaskNote(task, text)
{
    if (!text) text = "";

    var note = templateParent.querySelector("#task_note_template").children[0].cloneNode(true);

    AnimateElement(note, 'fade_in', false);

    note.querySelector('.task_note_text').value = text;
    GetTaskPieceParent(task).appendChild(note);
    return note;
}

function AddTaskChecklist(task, title, initialItems)
{
    if (!title) title = "";

    var checklist = templateParent.querySelector('#task_checklist_template').children[0].cloneNode(true);

    checklist.querySelector('.task_checklist_title').value = title;

    GetTaskPieceParent(task).appendChild(checklist);
    var parent = checklist.querySelector('.task_checklist_parent');

    AnimateElement(checklist, 'fade_in', false);

    if (initialItems && initialItems.length > 0)
    {
        initialItems.forEach(item =>
        {
            AddChecklistItem(parent, item.Text, item.Completed);
        });
    }

    return checklist;
}

function AddChecklistItem(parent, text, isCompleted)
{
    var item = templateParent.querySelector("#task_checklist_item_template").children[0].cloneNode(true);

    AnimateElement(item, 'fade_in', false);

    if (text)
    {
        item.querySelector('.task_checklist_text').value = text;
    }

    if (isCompleted)
    {
        ToggleElementDone(item);
    }

    parent.appendChild(item);
    return item;
}

function DeleteChecklistItem(item)
{
    item.classList.add("fade_out_left");
    item.addEventListener("animationend", function (e)
    {
        item.remove();
    });
}

function DeleteTaskPiece(piece)
{
    if (piece.matches('.task_piece'))
    {
        AnimateElement(piece, 'fade_out', true);
    }
}

function GetClosestPiece(element)
{
    return GetClosestParent(element, '.task_piece');
}