var scripts = ["scripts/colour_themes.js", "scripts/other.js", "scripts/drag.js", "scripts/save_load.js", "scripts/task.js", "scripts/catagory.js"];

scripts.forEach((script) =>
{
	var element = document.createElement("script");
	element.src = script;
	document.head.appendChild(element);
});

var templateParent = null;

window.onload = function (e)
{
	templateParent = document.body.querySelector('#template_parent');
	LoadData();
};

function OnTemplatesLoaded(frame)
{
	var innerDoc = frame.contentDocument || frame.contentWindow.document;
	console.log(innerDoc);
	templateParent = innerDoc.body;

	LoadData();
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