<template>
    <div>
        <div class = "contact-page-title">
            <h1>CONTACT US</h1>
            <hr class = "line">
        </div>
        <div class = "contact-page">
            <div class="contact-page-content">
                <!-- <h1 class="reach-title">CONTACT</h1> -->
                <p class="reach">Stuck somewhere? Have some query? Have a suggestion? We are here to listen and respond to serve you better! 
                    Reach out to us anywhere using these methods to resolve any query you have</p>
                <span class = "contact-info">
                    <h1 class = "icon">&#9742;</h1>
                    <h2 class="text">+91 9587747568</h2>
                </span>
                <span class = "contact-info">
                    <h1 class = "icon">&#9993;</h1>
                    <h2 class="text">contactus@docit.com</h2>
                </span>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    data() {
        return {
            name: "ContactPageView"
        }
    }
} 
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@600;700;800&display=swap');

.contact-page-title {
    width: 100%;
    height: 15vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: url("../assets/about/bg.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    font-family: 'Open Sans', sans-serif;
}
.contact-page-title h1 {
    font-size: 1.5rem;
    font-weight: 800;
    font-family: 'Open Sans', sans-serif;
    letter-spacing: 0.3rem;
    color: #fff;
}


.line {
    width: 5%;
    border: none;
    height: 0.2rem;
    background: #DB1A32;
    color:#DB1A32 !important;
    margin-top: 1%;}
.contact-page {

    width: 100vw;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.contact-page-content {
    width: 60%;
    height: 60%;
    padding: 4rem 6rem;
    display: flex;
    /* background-color: #EDEDF5; */
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    
}

.contact-info {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.icon {
    margin-right: 1rem;
    font-size: 3rem;
    color: #DB1A32;
}

.text {
    font-size: 1.2rem;
    font-weight: 700;
    font-family: 'Open Sans', sans-serif;
    color: #304D71;
}

.reach {
    font-size: 1.1rem;
    font-weight: 600;
    font-family: 'Open Sans';
    color: #304D71;
    text-align: center;
}

@media only screen and (max-width:900px) {
    
    .reach {
        font-size: 0.9rem;
    }
    .contact-page-content {
        
        padding: 3rem 5rem;
    }   
    .icon {
        margin-right: 1rem;
        font-size: 2.9rem;
    }
    
    .text {
        font-size: 1rem;

    }
}
@media only screen and (max-width:600px) {
    
    .contact-page-content {
        width: 80%;
        height: 70%;
        padding: 4rem 6rem;
        display: flex;
        /* background-color: #EDEDF5; */
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
    
    }
    .reach {
        font-size: 0.8em;
    }
    .contact-page-content {
        
        padding: 3rem 4rem;
    }   
    .icon {
        margin-right: 1rem;
        font-size: 2.2rem;
    }
    
    .text {
        font-size: 0.9rem;

    }
}

</style>