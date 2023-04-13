<template>
  <main class="about-container">
    <div class="about-title">
      <h1>MEET THE TEAM</h1>
      <hr class="horizontal">
    </div>
    <div class="about-content">
      <DevAbout
        v-for="(dev, index) in devs"
        :key="index"
        :class="['slide', dev.fname]"
        :avatar="dev.avatar"
        :designation="dev.designation"
        :fname="dev.fname"
        :last="dev.last"
        :linkedin="dev.linkedin"
        :github="dev.github"
        :instagram="dev.instagram"
        :mail="dev.mail"
      />
    </div>
  </main>
</template>

<script>
import DevAbout from "@/components/AboutComponent/DevAbout.vue";
import achyut from "@/assets/about/achyut.svg";
import aditya from "@/assets/about/aditya.svg";
import antriksh from "@/assets/about/antriksh.svg";
import anupam from "@/assets/about/anupam.svg";
import ojas from "@/assets/about/ojas.svg";

export default {
  name: "AboutPage",
  components: {
    DevAbout,
  },
  data() {
    return {
      ojas,
      devs: [
        {
          fname: "Aditya",
          last: "Desai",
          designation: "DOCUMENTATION HEAD",
          avatar: aditya,
          about:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. In aut expedita ad. Doloribus tempore laudantium nulla placeat. Ducimus vel optio corrupti eaque, maxime, dignissimos fugit tempore totam accusantium at voluptates nihil! Minus quo tempore saepe amet autem corrupti nostrum esse, modi laboriosam soluta? Beatae ex consectetur nisi omnis perferendis porro adipisci quod nemo dignissimos debitis asperiores, cumque eaque cupiditate reiciendis provident numquam ullam, laboriosam dolor vero! Ut quam neque repudiandae consequuntur laudantium asperiores impedit voluptates. Aliquam, ab. Eligendi ipsa atque eius minima velit? Veniam sint error inventore maxime mollitia, delectus perferendis culpa blanditiis magni, odit veritatis, non modi. Odio repellendus molestias nisi dolore obcaecati quae dolores totam nam? Sapiente voluptatum libero officiis magni, atque enim aliquam amet nam non aut dicta eum perferendis provident nisi itaque mollitia quae quas fugit qui quis neque. Consequuntur consectetur a dolores possimus nobis aspernatur quos! Incidunt provident ipsam veritatis praesentium numquam reiciendis dolorum maxime?",
          instagram: "https://www.instagram.com/",
          linkedin: "https://www.linkedin.com/in/aditya-desai-/",
          github: "https://www.github.com/AdityaDesai006",
          mail: "mailto:aditya.desai.btech2020@sitpune.edu.in",
        },
        {
          fname: "Antriksh",
          last: "Sharma",
          designation: "UI/UX FRONTEND ENGINEER",
          avatar: antriksh,
          about:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. In aut expedita ad. Doloribus tempore laudantium nulla placeat. Ducimus vel optio corrupti eaque, maxime, dignissimos fugit tempore totam accusantium at voluptates nihil! Minus quo tempore saepe amet autem corrupti nostrum esse, modi laboriosam soluta? Beatae ex consectetur nisi omnis perferendis porro adipisci quod nemo dignissimos debitis asperiores, cumque eaque cupiditate reiciendis provident numquam ullam, laboriosam dolor vero! Ut quam neque repudiandae consequuntur laudantium asperiores impedit voluptates. Aliquam, ab. Eligendi ipsa atque eius minima velit? Veniam sint error inventore maxime mollitia, delectus perferendis culpa blanditiis magni, odit veritatis, non modi. Odio repellendus molestias nisi dolore obcaecati quae dolores totam nam? Sapiente voluptatum libero officiis magni, atque enim aliquam amet nam non aut dicta eum perferendis provident nisi itaque mollitia quae quas fugit qui quis neque. Consequuntur consectetur a dolores possimus nobis aspernatur quos! Incidunt provident ipsam veritatis praesentium numquam reiciendis dolorum maxime?",
          instagram: "https://www.instagram.com/chrometrooper",
          linkedin: "https://www.linkedin.com/in/antriksh-sharma-964bb2166/",
          github: "https://www.github.com/AntrikshSharma",
          mail: "mailto:antriksh.sharma.btech2020@sitpune.edu.in",
        },
        {
          fname: "Achyut",
          last: "Shukla",
          designation: "BACKEND ENGINEER",
          avatar: achyut,
          about:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. In aut expedita ad. Doloribus tempore laudantium nulla placeat. Ducimus vel optio corrupti eaque, maxime, dignissimos fugit tempore totam accusantium at voluptates nihil! Minus quo tempore saepe amet autem corrupti nostrum esse, modi laboriosam soluta? Beatae ex consectetur nisi omnis perferendis porro adipisci quod nemo dignissimos debitis asperiores, cumque eaque cupiditate reiciendis provident numquam ullam, laboriosam dolor vero! Ut quam neque repudiandae consequuntur laudantium asperiores impedit voluptates. Aliquam, ab. Eligendi ipsa atque eius minima velit? Veniam sint error inventore maxime mollitia, delectus perferendis culpa blanditiis magni, odit veritatis, non modi. Odio repellendus molestias nisi dolore obcaecati quae dolores totam nam? Sapiente voluptatum libero officiis magni, atque enim aliquam amet nam non aut dicta eum perferendis provident nisi itaque mollitia quae quas fugit qui quis neque. Consequuntur consectetur a dolores possimus nobis aspernatur quos! Incidunt provident ipsam veritatis praesentium numquam reiciendis dolorum maxime?",
          instagram: "https://www.instagram.com/__achyut.07__",
          linkedin: "https://www.linkedin.com/in/achyut07",
          github: "https://www.github.com/Achyut-0705",
          mail: "mailto:achyut.shukla.btech2020@sitpune.edu.in",
        },
        {
          fname: "Ojas",
          last: "Inamdar",
          designation: "FRONTEND ENGINEER",
          avatar: ojas,
          about:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. In aut expedita ad. Doloribus tempore laudantium nulla placeat. Ducimus vel optio corrupti eaque, maxime, dignissimos fugit tempore totam accusantium at voluptates nihil! Minus quo tempore saepe amet autem corrupti nostrum esse, modi laboriosam soluta? Beatae ex consectetur nisi omnis perferendis porro adipisci quod nemo dignissimos debitis asperiores, cumque eaque cupiditate reiciendis provident numquam ullam, laboriosam dolor vero! Ut quam neque repudiandae consequuntur laudantium asperiores impedit voluptates. Aliquam, ab. Eligendi ipsa atque eius minima velit? Veniam sint error inventore maxime mollitia, delectus perferendis culpa blanditiis magni, odit veritatis, non modi. Odio repellendus molestias nisi dolore obcaecati quae dolores totam nam? Sapiente voluptatum libero officiis magni, atque enim aliquam amet nam non aut dicta eum perferendis provident nisi itaque mollitia quae quas fugit qui quis neque. Consequuntur consectetur a dolores possimus nobis aspernatur quos! Incidunt provident ipsam veritatis praesentium numquam reiciendis dolorum maxime?",
          instagram: "https://www.instagram.com/__ojas__",
          linkedin: "https://www.linkedin.com/in/ojas-inamdar",
          github: "https://www.github.com/TDP17",
          mail: "mailto:ojas.inamdar.btech2020@sitpune.edu.in",
        },
        {
          fname: "Anupam",
          last: "Muralidharan",
          designation: "FRONTEND ENGINEER",
          avatar: anupam,
          about:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. In aut expedita ad. Doloribus tempore laudantium nulla placeat. Ducimus vel optio corrupti eaque, maxime, dignissimos fugit tempore totam accusantium at voluptates nihil! Minus quo tempore saepe amet autem corrupti nostrum esse, modi laboriosam soluta? Beatae ex consectetur nisi omnis perferendis porro adipisci quod nemo dignissimos debitis asperiores, cumque eaque cupiditate reiciendis provident numquam ullam, laboriosam dolor vero! Ut quam neque repudiandae consequuntur laudantium asperiores impedit voluptates. Aliquam, ab. Eligendi ipsa atque eius minima velit? Veniam sint error inventore maxime mollitia, delectus perferendis culpa blanditiis magni, odit veritatis, non modi. Odio repellendus molestias nisi dolore obcaecati quae dolores totam nam? Sapiente voluptatum libero officiis magni, atque enim aliquam amet nam non aut dicta eum perferendis provident nisi itaque mollitia quae quas fugit qui quis neque. Consequuntur consectetur a dolores possimus nobis aspernatur quos! Incidunt provident ipsam veritatis praesentium numquam reiciendis dolorum maxime?",
          instagram: "https://www.instagram.com/anupam0__0",
          linkedin: "https://www.linkedin.com/in/anupam-muralidharan",
          github: "https://www.github.com/anu-10",
          mail: "mailto:anupam.muralidharan.btech2020@sitpune.edu.in",
        },
      ],
    };
  },
  methods: {
    fun() {
      console.log(this.r1);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@600;700;800&display=swap");

.about-container {
  width: 100%;
  height: auto;
}

.about-title {
  width: 100%;
  height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: url("../assets/about/bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.about-title h1 {
  font-size: 1.8rem;
  font-weight: 800;
  font-family: "Open Sans", sans-serif;
  letter-spacing: 0.3rem;
  color: #fff;
}

.horizontal {
  width: 10%;
  border: none;
  height: 0.2rem;
  background: #db1a32;
  color: #db1a32 !important;
  margin-top: 1%;
}

.about-content {
  display: inline-block;
  align-content: left;
  align-items: left;
  justify-content: left;
}

@media only screen and (max-width: 800px) {
  .about-title {
    height: 15vw;
  }

  .about-title h1 {
    font-size: 3vw;
  }
  .horizontal {
    height: 0.3vw;
  }
}
</style>
