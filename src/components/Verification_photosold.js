import React from 'react';
 
const Verification_photos = () => {
    return (
    	<div>
    		<meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous"/>
    
    <link rel="preconnect" href="https://fonts.gstatic.com"/>
    <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;600&display=swap" rel="stylesheet"/>
    
    
    <title>Verification Photos</title>
  
    <div id="menu-banner" class="row text-center py-3">
        <div class="col">
            <p class="display-5" id="login-title">
                <a href="/">
                    <img id="menu-image" src="https://wchstv.com/resources/media/1f5b2909-ee90-495b-be68-68d26537cbab-large16x9_WVU.png?1518011273124"/>
                </a>
            </p>
        </div>
    </div>
    
    <div class="container-fluid text-center mt-5">
        <div class="row justify-content-center my-5 ">
            <h1 class="display-6 mb-5">Verification Photos</h1>
            <div class="container">
                <div class="row">
                    <div class="col">
                        <img id="menu-image" src="./photos/me.jpg"/>
                    </div>
                    <div class="col">
                        <div class="card">
                            <div class="card-header">Discription</div>
                            <p class="text-center">Sample Text</p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <img id="menu-image" src="./photos/me.jpg"/>
                    </div>
                    <div class="col">
                        <div class="card">
                            <div class="card-header">Discription</div>
                            <p class="text-center">Sample Text</p>
                        </div>
                    </div>
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
 
export default Verification_photos;