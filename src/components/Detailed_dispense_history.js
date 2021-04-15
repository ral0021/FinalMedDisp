import React from 'react';
 
const Detailed_dispense_history = () => {
    return (
       <div>
       		<meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous"/>
    
    <link rel="preconnect" href="https://fonts.gstatic.com"/>
    <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;600&display=swap" rel="stylesheet"/>
    
    <link rel="stylesheet" href="./CSS/detailed_dispense_history.css"/>
    <title>Detailed Dispense History</title>
  
   
    <div id="menu-banner" class="row text-center py-3">
        <div class="col">
            <p class="display-5" id="login-title">
                <a href="./">
                    <img id="menu-image" src="https://wchstv.com/resources/media/1f5b2909-ee90-495b-be68-68d26537cbab-large16x9_WVU.png?1518011273124"/>
                </a>
            </p>
        </div>
    </div>
    
    <div class="container-fluid text-center mt-5">
        <div class="row justify-content-center my-5 ">
            <h1 class="display-6 mb-5">Detailed Dispense History</h1>
            <div class="col-md-5 col-sm-8 col-9">
                <div class="card">
                    <div class="card-header">Dispense History</div>
                    <div class="card-header">Don't Know what to put here</div>
                    <ul class="list-group list-group-flush">
                        <li id="green" class="list-group-item"> 
                            Don't know what to put here
                        </li>
                        <li id="yellow" class="list-group-item"> 
                            Not sure what this page is for
                        </li>
                        <li id="green" class="list-group-item"> 
                            We need to discuss this as a group
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="row justify-content-center pb-5">
            <div class="col-xl-2 col-lg-3 col-12">
                <button class="menu-button btn btn-light my-2" onClick={(e) => {
      e.preventDefault();
      window.location.href='/consumption_history';
      }}>Back To Consumption History</button>
            </div>
            <div class="col-xl-2 col-lg-3 col-12">
                <button class="menu-button btn btn-dark my-2" onClick={(e) => {
      e.preventDefault();
      window.location.href='/';
      }}>Main Menu</button>
            </div>
        </div>


    </div>

   
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js" integrity="sha384-q2kxQ16AaE6UbzuKqyBE9/u/KzioAlnx2maXQHiDX9d4/zp8Ok3f+M7DPm+Ib6IU" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.min.js" integrity="sha384-pQQkAEnwaBkjpqZ8RU1fF1AKtTcHJwFl3pblpTlHXybJjHpMYo79HY3hIi4NKxyj" crossorigin="anonymous"></script>
       </div>
    );
}
 
export default Detailed_dispense_history;