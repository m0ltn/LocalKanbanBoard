//Dragging

var dragDeltaX = 0;
var dragDeltaY = 0;
var draggedItem = null;
var originalItem = null;

function DragStartTask(e) {
    // catagories.forEach(catagory => {
    //     document.getElementById("catagory_" + catagory.Title).classList.add('highlight');
    // });

    this.classList.add('is-dragging-card');
    SetupDrag(e);
}

function Drag(e) {
    if (e.clientX <= 0 || e.clientY <= 0) {
        draggedItem.style.display = 'none';
    }
    else {
        draggedItem.style.left = (e.clientX - dragDeltaX) + 'px';
        draggedItem.style.top = (e.clientY - dragDeltaY) + 'px';
        draggedItem.style.display = 'block';
    }
}

function DragEndTask() {
    this.classList.remove('is-dragging-card');
    draggedItem.remove();
}


function DragStartCatagory(e) {
    this.classList.add('is-dragging-group');
    SetupDrag(e);
}

function DragEndCatagory() {
    this.classList.remove('is-dragging-group');
    draggedItem.remove();
}

function SetupDrag(e) {

    if (draggedItem != null) {
        draggedItem.remove();
        draggedItem = null;
    }

    originalItem = e.target;

    draggedItem = e.target.cloneNode(true);
    document.body.appendChild(draggedItem);
    draggedItem.style.pointerEvents = 'none';

    dragDeltaX = e.clientX - e.target.getBoundingClientRect().x;
    dragDeltaY = e.clientY - e.target.getBoundingClientRect().y;
    draggedItem.style.position = 'absolute';
    draggedItem.style.opacity = 0.5;

    Drag(e);

    e.dataTransfer.setDragImage(new Image(), 0, 0);
}

var hoveringOverTask = false;
var hoveringOverGroup = false;

function DragEnter(e) {
    hoveringOverTask = e.target.classList.contains('task');
    hoveringOverGroup = e.target.classList.contains('catagory');
}

function DragOverTask(e) {

    if (this == originalItem) return;

    this.classList.add('hovered');

    var rect = this.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    const card = document.querySelector('.is-dragging-card');
    if (card != null && card != e.target) {

        if (y > rect.height * 0.5) {
            this.insertAdjacentElement('beforebegin', card);
        }
        else {
            this.insertAdjacentElement('afterend', card);
        }
    }
}

function DragOverCatagory(e) {

    if (hoveringOverTask) {
        return;
    }

    if (this == originalItem) return;

    var rect = this.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;


    this.classList.add('hovered');
    const card = document.querySelector('.is-dragging-card');
    if (card != null) {
        if (!this.contains(card)) {
            this.appendChild(card);
        }
        return;
    }

    const group = document.querySelector('.is-dragging-group');
    if (group != null) {
        if (x > rect.width * 0.5) {
            this.insertAdjacentElement('beforebegin', group);
        }
        else {
            this.insertAdjacentElement('afterend', group);
        }
    }
}

function DragLeave(e) {
    this.classList.remove('hovered');

    if (hoveringOverTask && e.target.classList.contains('task')) {
        hoveringOverTask = false;
    }

    if (hoveringOverGroup && e.target.classList.contains('catagory')) {
        hoveringOverGroup = false;
    }
}

function Drop() {
    this.classList.remove('hovered');
}