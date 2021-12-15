import tMUrl from './thinking-man.webp';
import lUrl from './linkedin1.svg';
import iUrl from './instagram1.svg';
import tUrl from './twitter1.svg';
import './App.css';
import { useState } from 'react';

function App() {
// STATES
const [name, setName] = useState('');
const [phone, setPhone] = useState('');
const [warning, setWarning] = useState('')

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
      }, 2000)
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
    }, 900)
  }

}

  return (
    <div className="App">
      <header>
        <div className="logo">
          MeuFreela
        </div>
        <div>
        </div>
        <div className="contacts">
          <img 
          src={lUrl} 
          width="32px"
          height="32px"
          alt="Logo do Linkedin clique para ver nosso perfil"
          >
          </img>
          <img 
          src={iUrl} 
          width="32px"
          height="32px"
          alt="Logo do instagram clique para ver nosso perfil"
          >
          </img>
          <img 
          src={tUrl}
          width="32px"
          height="32px" 
          alt="Logo do twitter clique para ver nosso perfil"
          >
          </img>
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
            src={tMUrl}
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
