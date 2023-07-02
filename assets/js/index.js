const exercise = [
    {
        day: "day 1",
        link: "day1",
        list: [
            {
                title: "Exercise 1",
                link: "https://daithehh04.github.io/fullstack/day1/exercise-1.html",
            },
            {
                title: "Exercise 2",
                link: "https://daithehh04.github.io/fullstack/day1/exercise-2.html",
            },
            {
                title: "Exercise 3",
                link: "https://daithehh04.github.io/fullstack/day1/exercise-3.html",
            },
        ],
    },
    {
        day: "day 2",
        link: "day2",
        list: [
            {
                title: "Exercise 1",
                link: "https://daithehh04.github.io/fullstack/day2/exercise-1.html",
            },
            {
                title: "Exercise 2",
                link: "https://daithehh04.github.io/fullstack/day2/exercise-2.html",
            },
            {
                title: "Exercise 3",
                link: "https://daithehh04.github.io/fullstack/day2/exercise-3.html",
            },
            {
                title: "Exercise 4",
                link: "https://daithehh04.github.io/fullstack/day2/exercise-4.html",
            },
            {
                title: "Exercise 5",
                link: "https://daithehh04.github.io/fullstack/day2/exercise-5.html",
            },
        ],
    },
    {
        day: "day 3",
        link: "day3",
        list: [
            {
                title: "Exercise 1",
                link: "https://daithehh04.github.io/fullstack/day3/exercise-1.html",
            },
            {
                title: "Exercise 2",
                link: "https://daithehh04.github.io/fullstack/day3/exercise-2.html",
            },
            {
                title: "Exercise 3",
                link: "https://daithehh04.github.io/fullstack/day3/exercise-3.html",
            },
        ],
    },
    {
        day: "day 4",
        link: "day4",
        list: [
            {
                title: "Exercise 1",
                link: "https://daithehh04.github.io/fullstack/day4/exercise-1.html",
            },
            {
                title: "Exercise 2",
                link: "https://daithehh04.github.io/fullstack/day4/exercise-2.html",
            },
            {
                title: "Exercise 3",
                link: "https://daithehh04.github.io/fullstack/day4/exercise-3.html",
            },
        ],
    },
    {
        day: "day 5",
        link: "day5",
        list: [
            {
                title: "Exercise 1",
                link: "https://daithehh04.github.io/fullstack/day5/exercise-1.html",
            },
            {
                title: "Exercise 2",
                link: "https://daithehh04.github.io/fullstack/day5/exercise-2.html",
            },
            {
                title: "Exercise 3",
                link: "https://daithehh04.github.io/fullstack/day5/exercise-3.html",
            },
        ],
    },
    {
        day: "day 6",
        link: "day6",
        list: [
            {
                title: "Exercise 1",
                link: "https://daithehh04.github.io/fullstack/day6/exercise-1.html",
            },
            {
                title: "Exercise 2",
                link: "https://daithehh04.github.io/fullstack/day6/exercise-2.html",
            },
            {
                title: "Exercise 3",
                link: "https://daithehh04.github.io/fullstack/day6/exercise-3.html",
            },
        ],
    },
];

const root = document.querySelector("#root");
root.innerHTML = exercise
    .map(
        (item) =>
            `<div class="block">
            <h2 class="title">
                <a href="${item?.link}" target="_blank">#${item.day}</a>
            </h2>
            <ul class="list-exercise">
                ${item.list
                    .map(
                        (item2) =>
                            `<li class="exercise-item">
                        <a href="${item2.link}" target="_blank">${item2.title}</a>
                    </li>`
                    )
                    .join("")}
            </ul>
        </div>`
    )
    .join("");
