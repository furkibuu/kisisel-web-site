document.addEventListener("DOMContentLoaded", function() {
   
    var activeProjects = 5;
    var totalProjects = 10;

    
    document.getElementById("active-projects").textContent = activeProjects;
    document.getElementById("total-projects").textContent = totalProjects;
});


document.addEventListener("DOMContentLoaded", function() {
    var openModalButton = document.getElementById("open-modal");
    var modal = document.getElementById("github-modal");
    var closeButton = modal.querySelector(".close");
    var loadingProgress = modal.querySelector(".loading-progress");
    var languagesList = modal.querySelector("#languages-list");

    openModalButton.addEventListener("click", function() {
        modal.style.display = "block";
        loadingProgress.style.display = "block";

        var username = "fu-w";
        fetch("https://api.github.com/users/" + username + "/repos")
        .then(response => response.json())
        .then(data => {
            var languages = {};

            data.forEach(repo => {
                var lang = repo.language;
                if (lang) {
                    if (languages[lang]) {
                        languages[lang]++;
                    } else {
                        languages[lang] = 1;
                    }
                }
            });

            // En çok kullanılan dilleri yüzdelik olarak hesapla
            var totalRepos = Object.values(languages).reduce((a, b) => a + b, 0);
            var languagePercentages = {};
            for (var lang in languages) {
                languagePercentages[lang] = ((languages[lang] / totalRepos) * 100).toFixed(2);
            }

            // Dilleri tabloya ekle
            languagesList.innerHTML = "";
            for (var lang in languagePercentages) {
                var row = document.createElement("tr");
                row.innerHTML = `<td>${lang}</td><td>${languagePercentages[lang]}%</td>`;
                languagesList.appendChild(row);
            }

            loadingProgress.style.display = "none";
        })
        .catch(error => {
            console.error("GitHub dilleri alınırken hata oluştu:", error);
            loadingProgress.style.display = "none";
        });

        fetch("https://api.github.com/users/" + username)
            .then(response => response.json())
            .then(data => {
                var followers = data.followers;
                var following = data.following;
                var repos = data.public_repos;

                document.getElementById("followers").textContent = followers;
                document.getElementById("following").textContent = following;
                document.getElementById("repos").textContent = repos;

                loadingProgress.style.display = "none";
            })
            .catch(error => {
                console.error("GitHub istatistikleri alınırken hata oluştu:", error);
                loadingProgress.style.display = "none";
            });
    });

    closeButton.addEventListener("click", function() {
        modal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});





const scrollElements = document.querySelectorAll(".js-scroll");

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

let elementOutofView = (el) => {
  let elementTop = el.getBoundingClientRect().top;

  return (
    elementTop > (window.innerHeight || document.documentElement.clientHeight)
  );
};

const displayScrollElement = (element) => {
  element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
  element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    } else if (elementOutofView(el)) {
      hideScrollElement(el)
    }
  })
}

window.addEventListener("scroll", () => { 
  handleScrollAnimation();
});


let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


