function GetCatagoryParent()
{
    return document.getElementById("catagory_parent");
}

function GetCatagoryTemplate()
{
    return templateParent.querySelector('#catagory_template').children[0].cloneNode(true);
}

function GetClosestCatagory(element)
{
    return GetClosestParent(element, ".catagory");
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
    var elem = GetCatagoryTemplate();

    AnimateElement(elem, 'fade_in', false);

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