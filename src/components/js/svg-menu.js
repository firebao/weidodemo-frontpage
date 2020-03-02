export default {
  name: "svgMenu",
  data() {
    return {
      center: {
        x: 600,
        y: 350
      },
      categoryArray: [
        "fruits",
        "vegetables",
        "more",
        "kitchen-goods",
        "frozen-food",
        "rices",
        "fishes",
        "meats"
      ],
      menuActiveFlag: false,
      pathRadius: 150,
      path: [],
      pointer: "",
      counter: 0,
      indexCounter: null,
      timer: ""
    };
  },
  mounted: function() {
    for (let i = 0; i < 32; i++) {
      let x = Math.round(
        this.center.x + this.pathRadius * Math.cos((i * Math.PI) / 16)
      );
      let y = Math.round(
        this.center.y + this.pathRadius * Math.sin((i * Math.PI) / 16)
      );
      this.path.push({ x: x, y: y });
    }
    this.pointer = document.querySelector("#pointer");

    //this.timer = setInterval(this.pointerAnimate, 100);

    this.timer = this.runTimer(200, this.pointerAnimate);
    this.timer.startTimer();
  },
  methods: {
    //main menu-item select
    catSelect(category) {
      let mainMenuGroup = document.querySelector("#main-menu");
      let categoryGroup = document.querySelector(".category-" + category);
      let arrayClass = categoryGroup.getAttribute("class").split(" ");
      //handle category group
      if (arrayClass.indexOf("active") < 0) {
        //remove other category group's active class
        let activeCategory = mainMenuGroup.querySelector(".active");
        if (activeCategory) {
          let oldClass = activeCategory.getAttribute("class").split(" ");
          oldClass.pop("active");
          activeCategory.setAttribute("class", oldClass.join(" "));
        }
        arrayClass.push("active");
        //set main menu to active state
        mainMenuGroup.setAttribute("class", "active");
        this.menuActiveFlag = true;
        //move pointer to active category,stop the old animate and
        //start a shorter animate that move the pointer to the axtive
        //category location
        this.timer.clearTimer();
        this.pointerMove(category);
        //set vuex state
        this.$store.commit("setActiveCategory", { category: category });
      } else {
        //select category has been active, another select will cancel
        //active state
        arrayClass.pop("active");
        this.menuActiveFlag = false;
        //this will restrar rotate animation
        this.timer = this.runTimer(200, this.pointerAnimate);
        this.timer.startTimer();
        //set vuex state
        this.$store.commit("cancelActiveCategory");
      }
      categoryGroup.setAttribute("class", arrayClass.join(" "));
      let mainMenuClass = this.menuActiveFlag ? "active" : "";
      mainMenuGroup.setAttribute("class", mainMenuClass);
    },
    //if you give the funcition the category name,
    //it will move the pointer to the corresponding position
    pointerMove(category) {
      let index = this.categoryArray.indexOf(category);
      let counts = ((index + 4) % 8) * 4 - this.counter;
      counts = counts < 0 ? counts + 32 : counts;
      console.log(counts);
      this.timer = this.runTimer(200, this.pointerAnimate, counts);
      this.timer.startTimer();
    },
    //pointer will always rotate until category is actived
    pointerAnimate() {
      this.counter = (this.counter + 1) % this.path.length;
      this.pointer.setAttribute("cx", this.path[this.counter].x);
      this.pointer.setAttribute("cy", this.path[this.counter].y);
    },
    //random select category
    randomSelect() {
      let random, randomCategory, activeCategory;
      do {
        random = Math.floor(Math.random() * this.categoryArray.length);
        randomCategory = this.categoryArray[random];
        if (this.menuActiveFlag) {
          activeCategory = document
            .querySelector("#main-menu .active")
            .getAttribute("class");
        } else {
          break;
        }
      } while (activeCategory.indexOf(randomCategory) >= 0);
      this.catSelect(this.categoryArray[random]);
    },
    //optimized timer function
    //animateTime: timer's interval
    //callback: timed function
    //counts: timed finction will stop aftter excute counts times
    runTimer(animateTime, callback, counts = "disabled") {
      //record start time
      let counter = 0;
      let startTime = getTime();
      let timer = [];
      //get current time
      function getTime() {
        return new Date().getTime();
      }
      //the timer main function,
      //parameter diffTime indicate the time to reduce
      function timeout(diffTime) {
        let runtime = animateTime - diffTime;
        timer.push(
          setTimeout(() => {
            if (counter == counts && counts != "disabled") {
              clearTimer();
              return;
            }
            let tmp = startTime;
            callback();
            counter++;
            startTime = getTime();
            diffTime = startTime - tmp - animateTime;
            timeout(diffTime);
          }, runtime)
        );
      }
      function clearTimer() {
        timer.forEach(function(timer) {
          clearTimeout(timer);
        });
        timer = [];
      }
      function startTimer() {
        timeout(0);
      }
      return { clearTimer, startTimer };
    }
  }
};
