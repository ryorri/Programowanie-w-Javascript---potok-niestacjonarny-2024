
{
let noOfInputs = 2;

function AddInput()
{
    noOfInputs = noOfInputs + 1;

    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "field"+noOfInputs);
    input.setAttribute("class", 'field');
    input.setAttribute("value", '');
    document.getElementById('fields').appendChild(input);
}

function DeleteInputs()
{
    for (let i = noOfInputs; i > 2; i--)
    {

            if(document.getElementById("field"+i).value == '' )
            {
                document.getElementById("fields").removeChild(document.getElementById("field"+i));


                noOfInputs = noOfInputs - 1;

            }
        
    }


    document.querySelectorAll('.field').forEach((element, index) => {
        element.setAttribute('id','field'+index)
      })
}

function Sum()
{
    let sum = 0;

    
    for (let i = 0; i <= noOfInputs; i++)
    {
        let chck = true;
        if(typeof document.getElementById("field"+i) == 'undefined')
        {
            chck = false;
        }


        if(chck == true)  
        {
            let x = document.getElementById("field"+i).value;
            if(x != '')
            {
                sum = sum + parseInt(x);
            }
        }
        
       
    }

    document.getElementById('totalSum').value = sum;
}

function Avg()
{
    let sum = 0;
    let noOfFilledInputs = 0;

    for (let i = 0; i <= noOfInputs; i++)
    {
        let x = document.getElementById("field"+i).value;
        if(x != '')
        {
            noOfFilledInputs = noOfFilledInputs + 1;
        }
       
    }

    for (let i = 1; i <= noOfInputs; i++)
    {
        let x = document.getElementById("field"+i).value;
        if(x != '')
        {
            sum = sum + parseInt(x);
        }
       
    }

    document.getElementById('avg').value = sum/noOfFilledInputs;
}

function MinMax()
{
    const temp =[];

    for (let i = 0; i <= noOfInputs; i++)
    {
        let x = document.getElementById("field"+i).value;

        if(x != '')
        {
            temp.push(x);
        }
        
    }

    document.getElementById('min').value = Math.min(...temp);
    document.getElementById('max').value = Math.max(...temp);

}
document.body.addEventListener("change", Sum)
document.body.addEventListener("change", Avg)
document.body.addEventListener("change", MinMax)

document.getElementById('addField').addEventListener("click", Sum)
document.getElementById('addField').addEventListener("click", Avg)
document.getElementById('addField').addEventListener("click", MinMax)

document.getElementById('DeleteField').addEventListener("click", Sum)
document.getElementById('DeleteField').addEventListener("click", Avg)
document.getElementById('DeleteField').addEventListener("click", MinMax)



}