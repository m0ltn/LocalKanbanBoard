var scripts = ["scripts/colour_themes.js", "scripts/other.js", "scripts/drag.js", "scripts/save_load.js"];

scripts.forEach((script) =>
{
	var element = document.createElement("script");
	element.src = script;
	document.head.appendChild(element);
});




const NoPriority = "no_priority";
const LowPriority = "low_priority";
const MedPriority = "med_priority";
const HighPriority = "high_priority";

var activeMenu = null;

window.onload = function (e)
{
	LoadData();
};

window.onclick = function (event)
{
	if (activeMenu != null && !IsChildOf(event.target, activeMenu.parentNode))
	{
		activeMenu.classList.remove("show");
		activeMenu = null;
		menuInitiator = null;
	}
};

function GetCatagoryParent()
{
	return document.getElementById("catagory_parent");
}

function GetClosestParent(element, selector)
{
	for (; element && element != document; element = element.parentNode)
	{
		if (element.matches(selector)) return element;
	}
	return null;
}

function IsChildOf(element, parent)
{
	while (element != undefined && element != null && element != document.body)
	{
		if (element == parent)
		{
			return true;
		}
		element = element.parentNode;
	}
	return false;
}

function GetClosestTask(element)
{
	return GetClosestParent(element, ".task");
}

function GetClosestCatagory(element)
{
	return GetClosestParent(element, ".catagory");
}

function RemoveTemplateClass(element)
{
	element.classList.remove('TEMPLATE');
}

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

function ShowMenu(task, selector)
{
	var menu = task.querySelector(selector);

	if (activeMenu != null)
	{
		activeMenu.classList.remove("show");
		activeMenu = null;

		if (activeMenu == menu)
		{
			return;
		}
	}

	activeMenu = menu;
	menu.classList.add("show");
}

function DeleteTask(element)
{
	if (element.matches(".task"))
	{
		AnimateElement(element, 'fade_out', true);
	}
}

function CreateTask(catagory)
{
	var task = document.getElementById("task_root").cloneNode(true);
	AnimateElement(task, 'fade_in', false);

	task.style = "";
	task.id = "";

	//remove template pieces
	task.querySelector('.task_pieces_parent').innerHTML = '';

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

function DeleteCatagory(catagory)
{
	if (catagory.matches(".catagory"))
	{
		//catagory.remove();
		AnimateElement(catagory, 'fade_out', true);
	}
}

function CreateCatagory(name)
{
	var elem = document.getElementById("catagory_root").cloneNode(true);
	elem.id = "";

	AnimateElement(elem, 'fade_in', false);

	elem.id = '';
	elem.style = "";

	//remove exisitng task template
	elem.querySelector("#task_root").remove();

	elem.addEventListener("dragstart", DragStartCatagory);
	elem.addEventListener("drag", Drag);
	elem.addEventListener("dragend", DragEndCatagory);

	elem.addEventListener("dragenter", DragEnter);
	elem.addEventListener("dragover", DragOverCatagory);
	elem.addEventListener("dragleave", DragLeave);
	elem.addEventListener("drop", Drop);

	elem.querySelector(".catagory_title").value = name;

	GetCatagoryParent().appendChild(elem);
	return elem;
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

function ToggleElementDone(element)
{
	if (element.classList.contains("done"))
	{
		element.classList.remove("done");
	} else
	{
		element.classList.add("done");
	}
}

function GetTaskPieceParent(task)
{
	return task.querySelector(".task_pieces_parent");
}

function AddTaskNote(task, text)
{
	if (!text) text = "";

	var note = document.body.querySelector("#task_note_root").cloneNode(true);

	note.style.display = "";

	AnimateElement(note, 'fade_in', false);

	note.querySelector('.task_note_text').value = text;
	GetTaskPieceParent(task).appendChild(note);
	return note;
}

function AddTaskChecklist(task, title, initialItems)
{
	if (!title) title = "";

	var checklist = document.body.querySelector("#task_checklist_root").cloneNode(true);
	checklist.style.display = "";
	GetTaskPieceParent(task).appendChild(checklist);
	var parent = checklist.querySelector('.task_checklist_parent');
	parent.innerHTML = '';

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
	var item = document.body
		.querySelector(".task_checklist_item")
		.cloneNode(true);
	item.style.display = "";

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

function AnimateElement(element, animation, removeOnEnd)
{
	element.classList.add(animation);

	element.addEventListener('animationend', function (e)
	{
		element.classList.remove(animation);

		if (removeOnEnd)
		{
			element.remove();
		}
	});
}