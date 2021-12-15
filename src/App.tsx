import sunUrl from './sun.webp' 
import moonUrl from './moon.webp' 
import linkedinUrl from './linkedin1.svg';
import instagramUrl from './instagram1.svg';
import twitterUrl from './twitter1.svg';
import thinkingManUrl from './thinking-man.webp';
import './App.css';
import { CSSProperties, useState } from 'react';

function App() {
// STATES
const [name, setName] = useState('');
const [phone, setPhone] = useState('');
const [warning, setWarning] = useState('');
const [menuIsOpen, setMenuIsOpen] = useState(false);
const [darkMode, setDarkMode] = useState(false);

// FUNCTIONS
const handleNameInput = (e: any) => {
  setName(e.target.value)
}
const handlePhoneInput = (e: any) => {
  let n = e.target.value.replace(/\D/g, '').match( /(\d{0,2})(\d{0,5})(\d{0,4})/ );

  let res = e.target.value = !n[2] ? n[1] : '(' + n[1] + ') ' + n[2] + (n[3] ? '-' + n[3] : '');
  setPhone(res)
}
const handleCallToAction = (e:any) => {
  e.preventDefault();
  if (document.querySelector('input[type="text"]') !== null) {
    (document.querySelector('input[type="text"]') as HTMLInputElement).focus();
  }
}
const handleMobileMenu = () => {
  if (!menuIsOpen) {
    setMenuIsOpen(true);
    document.querySelector('header')?.classList.add('mobileMenuIsOpen')
  } else {
    setMenuIsOpen(false);
    document.querySelector('header')?.classList.remove('mobileMenuIsOpen')
  }
}

const handleDarkMode = () => {
  if(!darkMode) {
    setDarkMode(true);
    let cssVariables:any = document.querySelector(':root');
    if(document.querySelector('.dark-mode-button img') !== null)  {
      (document.querySelector('.dark-mode-button img') as HTMLImageElement).src = sunUrl;
    }
    if(cssVariables !== null) {      
      cssVariables.style.setProperty('--body-bg-color','#1a1a1a');
      cssVariables.style.setProperty('--header-gradient-color1','#D92223');
      cssVariables.style.setProperty('--header-gradient-color2','#000000');
      cssVariables.style.setProperty('--dark-mode-border-color','#000000');
      cssVariables.style.setProperty('--main-button-bg-color','#a12828');
      cssVariables.style.setProperty('--section-text-color','#FFFFFF');
      cssVariables.style.setProperty('--aside-text-color','#FFFFFF');
      cssVariables.style.setProperty('--form-submit-bg-color','#0b7e61');
      cssVariables.style.setProperty('--polygon-color','#2D2D2D');
    }
      
  } else {
    setDarkMode(false);
    let cssVariables:any = document.querySelector(':root');
  if(document.querySelector('.dark-mode-button img') !== null)  {
    (document.querySelector('.dark-mode-button img') as HTMLImageElement).src = moonUrl;
    if(cssVariables !== null) {      
      cssVariables.style.setProperty('--body-bg-color','#FBFBFB');
      cssVariables.style.setProperty('--default-text-color','#000000');
      cssVariables.style.setProperty('--header-gradient-color1','#EE5253');
      cssVariables.style.setProperty('--header-gradient-color2','#D92223');
      cssVariables.style.setProperty('--dark-mode-border-color','#FFFFFF');
      cssVariables.style.setProperty('--main-button-bg-color','#EE5253');
      cssVariables.style.setProperty('--section-text-color','#000000');
      cssVariables.style.setProperty('--aside-text-color','#000000');
      cssVariables.style.setProperty('--form-submit-bg-color','#10AC84');
      cssVariables.style.setProperty('--polygon-color','#EAEAEA');
    
    }
  }
  }
}

const handleSubmit = async () => {

  let url = "https://jsonplaceholder.typicode.com/users";
    let response = await fetch(url);
    let res = await response.json();
    console.log(res);



// REQUISITION
  if(name && phone) {
    let url = 'https://jsonplaceholder.typicode.com/users';
    let response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        id: (res.length + 1),
        name: name,
        phone: phone,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let json = await response.json();
    console.log(json);

    if(json.id) {
      document.querySelector('aside .warning')?.classList.add('green')
      setWarning("Contato enviado! Obrigado pela Confiança!")
      setTimeout(()=>{
        document.querySelector('aside .warning')?.classList.remove('green')
      }, 1000)
    } else {
      document.querySelector('aside .warning')?.classList.add('red')
      setWarning("Ocorreu algum erro...")
      setTimeout(()=>{
        document.querySelector('aside .warning')?.classList.remove('red')
      }, 1000)
    }
  } else {
    document.querySelector('aside .warning')?.classList.add('red')
    setWarning("Opa! Faltou algum campo!")
    setTimeout(()=>{
      document.querySelector('aside .warning')?.classList.remove('red')
    }, 1000)
  }

}

  return (
    <div className="App">
      <header>
        <div className="logo">
          MeuFreela
        </div>
        <div className="dark-mode" onClick={handleDarkMode}>
          <div className="dark-mode-button">
            <img src={sunUrl} width="32px" height="32px"></img>
          </div>
        </div>
        <div className="contacts">
          <div>
            <img 
            src={linkedinUrl} 
            width="32px"
            height="32px"
            alt="Logo do Linkedin clique para ver nosso perfil"
            >
            </img>
          </div>

          <div>
            <img 
            src={instagramUrl} 
            width="32px"
            height="32px"
            alt="Logo do instagram clique para ver nosso perfil"
            >
            </img>
          </div>

          <div>
            <img 
            src={twitterUrl}
            width="32px"
            height="32px" 
            alt="Logo do twitter clique para ver nosso perfil"
            >
            </img>
          </div>
          
        </div>
        <div className="mobile-menu">
          <ul>
            <li>
            <div className="contacts">
              <div>
              <img 
              src={linkedinUrl} 
              width="32px"
              height="32px"
              alt="Logo do Linkedin clique para ver nosso perfil"
              >
              </img>
            </div>
            <div>
              <img 
              src={instagramUrl} 
              width="32px"
              height="32px"
              alt="Logo do instagram clique para ver nosso perfil"
              >
              </img>
            </div>

            <div>
              <img 
              src={twitterUrl}
              width="32px"
              height="32px" 
              alt="Logo do twitter clique para ver nosso perfil"
              >
              </img>
            </div>
          </div>
            </li>
            <li>
              <div className="dark-mode" onClick={handleDarkMode}>
                <div className="dark-mode-button">
                <img src={sunUrl} width="32px" height="32px"></img>
                </div>
              </div>
            </li>
          </ul>
        </div>
            <div className="mobile-menu-button" onClick={handleMobileMenu}>
              <div></div>
              <div></div>
              <div></div>
            </div>
      </header>
      <main>
        <div className="bg-photo">
          <div className="main-text">
            <small>
              Desenvolvedores prontos para ação
            </small>
            <h1>
              Seu projeto pronto <br/>
              na velocidade da luz
            </h1>
            <a 
            href="#contact-form"
            onClick={handleCallToAction}>
            Peça uma reunião
            </a>
          </div>
        </div>
      </main>
      <section>
        <div className="aboutus">
          <div className="aboutus-left">
            <h3>
              Nossa Iniciativa
            </h3>
            <p>
              Somos desenvolvedores que se dedicam a fazer projetos perfeitos
              e entregar valor para todos os seus clientes. Gostamos de ver 
              clientes satisfeitos com projetos feitos com carinho atenção
              e qualidade altíssima.
            </p>
          </div>
          <div className="aboutus-right">
            <img 
            width="500px" height="500px"
            src={thinkingManUrl}
            alt="Homem com a mão no queixo pensando" />
          </div>
        </div>
      </section>
      <aside id="contact-form">
        <div className="form-description">
          <h3>
            Mande um oi, ligamos para você!
          </h3>
          <p>
            Preencha seus dados para que a gente possa entrar em contato
          </p>
        </div>
        <fieldset>

          <label>
          Nome Completo:<br/>
          <input id="name" 
          type="text" 
          placeholder='Ex: Heron Oliveira Amaral' 
          value={name} onChange={handleNameInput}>
          </input>
          </label>
          <br/>
          <label>
          Whatsapp:<br/>
          <input id="phone"
           type="text" 
           placeholder='(99) 99999-9999'
           value={phone}
           onChange={handlePhoneInput}
           >
           </input>
          </label>
          <button onClick={handleSubmit}>
            Peça uma reunião
          </button>
        </fieldset>
        <span className="warning">{warning}</span>
      </aside>
      <footer>
        <span>
          Desafio 1 - front-end iniciante
          <br/>
          Iniciativa <strong>DEV HALL</strong>
        </span>
      </footer>
    </div>
  )
}

export default App
