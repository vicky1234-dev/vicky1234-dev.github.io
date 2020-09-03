
document.body.onload = function() {             //making splash page before body load
   
    setTimeout(function () {
        $('.splash').addClass('displayNone')  //making splash page stay for 2s
    },2000)
}

var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

function gethour(hours) {   //12 hour time

    if(hours>12) {
        hours = hours - 12
        return hours
    }
    return hours
}

function getMinutes(minutes) { //12 hour time

    if (minutes < 10) {
        minutes = "0" + minutes
        return minutes
    }
    return minutes
}
function getam (hours) {    
    if (hours >= 12) {
        return 'pm'
    }
    else {
        return 'am'
    }
}
const questions = [                     //questions array
        {
            question: "What is your name?",
            choice:'namechoice'
        },
        {
            question: "Who is the best cricketer in the world?",
            choice:'cricketerchoice'
        },
        {
            question: "What are the colors in the Indian national flag? ",
            choice:'colorschoice'
        }

]

const values = {            //value app to store values of inputs
    Name:'',
    Cricketor:'',
    Colors:[]
}

const app = {                
    init() {        //init

        this.resultsFromDatabase = [],  //array to store values coming from database
        this.templates = {          //templates
            namechoice: `<input type="text" class="input value">`,
            cricketerchoice: `<input type="radio" id="Sachin" name="player" value="Sachin Tendulkar">
                                <label for="Sachin">Sachin Tendulkar</label><br>
                                <input type="radio" id="Virat" name="player" value="Virat Kolli">
                                <label for="Virat">Virat Kolli</label><br>
                                <input type="radio" id="Gilchirst" name="player" value="Adam Gilchirst">
                                <label for="Gilchirst">Adam Gilchirst</label><br>
                                <input type="radio" id="Jacques" name="player" value="Jacques Kallis">
                                <label for="Jacques">Jacques Kallis</label>`,
            colorschoice: `  
                            <span class='selectall'>Select all:</span><br>
                            <input type="checkbox" name="color1" value="White">
                                <label for="color1"> White</label><br>
                                <input type="checkbox" name="color2" value="Yellow">
                                <label for="color2"> Yellow</label><br>
                                <input type="checkbox" name="color3" value="Orange">
                                <label for="color3"> Orange</label><br>
                                <input type="checkbox" id="color3" name="color3" value="Green">
                                <label for="color3"> Green</label><br><br>
                         `,   

        }

        this.addEvents()
 
    },

    addEvents() {           //method for adding events
        let _this = this;
        $('.nextButton').click(function () {        //next button event handler

            _this.count = ++_this.count
            if (questions[_this.count] == undefined) {  //checking for last page next button click
                
                let validate = _this.setValues(this, true);
                if (!validate) return   // return if user missed to check input
                _this.makeSummary(_this)    //making summary html
                
                $('.main').get(0).innerHTML = _this.templates.summary   //adding new html
                return
            }

            let validate = _this.setValues(this);
            if (!validate) return       // return if user missed to give input
            let choice = questions[_this.count].choice

            $('.main__question').get(0).innerHTML = questions[_this.count].question     //changing questions after each next btn click
            $('.choices').get(0).innerHTML = _this.templates[choice]    // changing choices after each next button click
        })

        $('.history').click(function () {       //show history button click
            $.post("http://localhost:8080/getdata", {   //url for form

            }, (data, status) => {

                if (status === 'success') {     // server responded with data string from database
                    this.resultsFromDatabase = JSON.parse(data) //parsing to make app

                       $('.historyResults').get(0).innerHTML = ''
                      this.resultsFromDatabase.forEach((item, index) => {       //showing all stored db values in html
                           $('.historyResults').get(0).innerHTML += `<br><br>
                                <p class="game">GAME ${++index} :   <span>${new Date(+item.seconds).getDate() } ${month[new Date(+item.seconds).getMonth()]} ${gethour(new Date(+item.seconds).getHours())}:${getMinutes(new Date(+item.seconds).getMinutes())}${getam(new Date(+item.seconds).getHours())}</span></p><br>
                                <p class="name">Name : ${item.name}</p>
                                <p class="question">${questions[1].question}</p>
                                <p class="answer">${item.cricketer}</p>
                                <p class="question">${questions[2].question}</p>
                                <p class="answer">${item.colors.replace(/[ ,.]/g, ", ")}</p>
                                `

                            });
                }
                else{   // code for failed serer resonse
                }

            });
        })

        $('.finishButton').click(function () {      //finish  button handler
            
            $('.main').get(0).innerHTML = `<p class="main__question">${questions[0].question}</p><div class="choices">${app.templates.namechoice}</div>`
            $('.historyResults').get(0).innerHTML = ''
            
            app.count = 0        //setting count to zero to reach first page
            values.Colors = []      
        })

    },


    setValues(element, last) {      //last is for checking last page click
       
        let key = $(element).parent().find(`input`).attr('type')  //type of input element
        let selectedElement = $(element).parent().find(`input`)   //input element
        switch (key) {
            case 'text':        //if input type text

                values.Name = $(selectedElement).val()  //take its value
                
                if(values.Name == '') { 
                    alert('Empty name not allowed . Fill name')
                    this.count = --this.count;      //stay on same page if value is empty
                    return false }
                else { 
                    return true }
                break;

            case 'radio':           //input type radio for second page
                values.Cricketor = $(selectedElement).filter(':checked').val()
                
                if (values.Cricketor == undefined) {        //if no radio element selected then give alert
                    alert('Select one value')
                    this.count = --this.count;
                    return false
                } else {
                    
                    return true
                }

                
                break;

            case 'checkbox':        //input type checkbox for third page
                
                $(selectedElement).filter(':checked').each(function () {
                    values.Colors.push($(this).val())
                });

                if (values.Colors.length == 0) {        //if no colors is checked
                    alert('Select one value')
                    this.count = --this.count;
                    
                    return false
                } else {        //make request to server to send data to server
                    if (last) {
                        console.log(new Date().getTime())
                        
                        $.post("http://localhost:8080/senddata", { //url at which data is sent
                            
                            name: values.Name,      //data 
                            cricketor: values.Cricketor,
                            color: JSON.stringify(values.Colors),
                            time: new Date().getTime()
                        }, (data, status) => {});
                    }
                    return true
                }
                break;
            default:
                break;
        } 
    },

    makeSummary(_this){             //make summary page content
        _this.templates.summary = `
                        <p class="name">Hello ${values.Name} ,</p>
                        <p>Here are the answers selected:</p>
                        <p class="question">${questions[1].question}</p>
                        <p class="answer">${values.Cricketor}</p>
                        <p class="question">${questions[2].question}</p>
                        <p class="answer">${values.Colors.join(' ')}</p>        
                    `
    },
    count:0         //count to store page counts
}

app.init()          //app initialization

