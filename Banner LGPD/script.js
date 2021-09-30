let lgpdUrl = 'https://randommer.io/api/Name?nameType=firstname&quantity=1';
let lgpdHtml = `
    <div class="lgpd">
        <div class="lgpd--left">
            Nós utilizado cookie para melhorar sua experiência do usuário.<br/>
            Para conferir detalhadamento todos os cookies utilizados, leia nossa <a href="">politica de privacidade</a>
        </div>
        <div class="lgpd--rigth">
            <button>OK</button>
        </div>
    </div>
    <link rel="stylesheet" href="style.css" />
`;

let lsContent = localStorage.getItem("lgpd");
if (!lsContent) {
    document.body.innerHTML += lgpdHtml;

    let lgpdArea = document.querySelector('.lgpd');
    let lgpdButton = lgpdArea.querySelector('button');

    console.log(lgpdArea);
    console.log(lgpdButton);

    lgpdButton.addEventListener('click', async ()=>{
        lgpdArea.remove();

       let result = await fetch(lgpdUrl, {
            method: "GET",
            withCredentials: true,
            headers: {
              "X-Api-Key": "6472763a2e524fea8f7702ce7ee6b4d3",
              "Content-Type": "application/json"
            }});
        
        let json = await result.json();

        console.log(json);

        localStorage.setItem('lgpd', json);
    });
}
