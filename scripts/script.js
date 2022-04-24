var scripts = ["scripts/colour_themes.js", "scripts/other.js", "scripts/drag.js", "scripts/save_load.js", "scripts/task.js", "scripts/catagory.js"];

scripts.forEach((script) =>
{
	var element = document.createElement("script");
	element.src = script;
	document.head.appendChild(element);
});

var activeMenu = null;
var templateParent = null;

window.onload = function (e)
{
	templateParent = document.body.querySelector('#template_parent');
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