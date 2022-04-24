// auto resize multiple textarea
function autoResizeHeight(element)
{
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
}

function AutoResizeWidth(element)
{
    element.style.width = "auto";
    element.style.width = element.scrollWidth + "px";
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