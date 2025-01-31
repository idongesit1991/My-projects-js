async function start(username) {
  let response = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Accept: "application/json",
    },
  });
  response = await response.json();

  return response;
}

const inputSectionInner = document.getElementById("userId");
const userDetails = document.getElementById("account__details");
const searchButton = document.getElementById("theButton");

searchButton.addEventListener("click", async () => {
  const userId = document.getElementById("userId");
  if (!userId) return;

  const username = userId.value;

  if (!username) {
    console.error("Please enter a username");
    return;
  }

  const result = await start(username);

  userDetails.classList.add("hide");
  userDetails.classList.remove("hide");

  console.log({ result });

  const userData = document.getElementById("account__details");
  if (!userData) return;

  const dataInfo = userData.value;

  const userProfile = `
  <div class="imageName__section">
            <img
              src= ${result.avatar_url}
              alt=""
            />
            <section class="name__address">
              <strong>${result.login}</strong>
              <strong class="blue">@${result.login}</strong>
            </section>
          </div>

          <div class="account__activities">
            <ul class="main__activity">
              <li class="following__Followers">
                <section>
                  <ul class="Num__followers">
                    <i class="las la-user-friends"></i>
                    <li>${result.followers} followers</li>
                  </ul>
                </section>

                <section>
                  <ul class="Num__following">
                    <i class="las la-user-friends"></i>
                    <li>${result.following} following</li>
                  </ul>
                </section>
              </li>

              <li class="reposts__Gists">
                <section>
                  <ul class="Num__reposts">
                    <i class="las la-code-branch"></i>
                    <li>${result.public_repos} repositries</li>
                  </ul>
                </section>

                <section>
                  <ul class="Num__gists">
                    <i class="lar la-star"></i>
                    <li>${result.public_gists} gists</li>
                  </ul>
                </section>
              </li>
            </ul>
          </div>
  `;
  userData.innerHTML = userProfile;
});
