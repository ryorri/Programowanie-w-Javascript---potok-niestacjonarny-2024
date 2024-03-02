
{
let noOfInputs = 3;

function AddInput()
{
    noOfInputs = noOfInputs + 1;

    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "field"+noOfInputs);
    input.setAttribute("value", 0);
    document.getElementById('fields').appendChild(input);
}

function DeleteInputs()
{
    for (let i = 1; i <= noOfInputs; i++)
    {

        if(document.getElementById("field"+i).value == '')
        {
            let x = document.getElementById("field"+i);
            document.getElementById("fields").removeChild(x);
            noOfInputs = noOfInputs - 1;
        }
    }
}

function Sum()
{
    let sum = 0;

    for (let i = 1; i <= noOfInputs; i++)
    {
        let x = document.getElementById("field"+i).value;
        sum = sum + parseInt(x);
    }

    document.getElementById('totalSum').value = sum;
}


document.body.addEventListener("mousemove", Sum())


}