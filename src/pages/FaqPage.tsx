import "../styles/_faqPage.scss";
export const FaqPage = () => {
  return (
    <>
    <div className="faq">
      <div className="top-section">
        <div className="top-section__image">
          <img src="pfas-img.png" alt="pfas" />
        </div>
      <div className="top-section__overlay-text">
        <h3>PFAS: Ett osynligt hot i vårt vatten.</h3>
        <p>PFAS är kemikalier som är svåra att bryta ner och kan 
           påverka vår hälsa negativt. Vi erbjuder lösningar för att
           identifiera, rena och förebygga spridning av dessa ämnen.</p>

      </div>

      </div>
      <div className="faq-section-1">
        <div className="faq-section__text">
          <h3>Vad är PFAS och varför är det viktigt?</h3>
          <p>PFAS är en grupp svårnedbrytbara ämnen som kan ackumuleras i miljön
      och människokroppen. Exponering för höga halter av PFAS kan påverka
      hälsan negativt, såsom effekter på immunsystemet och kolesterolnivåer.</p>
        </div>
        <div className="faq-section__image">
          <img src="Group 18.png" alt="water" />
        </div>
      </div>   
      <div className="faq-section-2">
       
        <div className="faq-section__image">
          <img src="pfas-2.png" alt="pfas" />
        </div>
        <div className="faq-section__text">
          <h3>Vilka regler gäller för PFAS i livsmedel?</h3>
          <p> Från och med den 1 januari 2023 har EU infört gränsvärden för vissa PFAS-ämnen 
        i livsmedel. Dessa regler inkluderar gränsvärden för PFOS, PFOA, PFNA och PFHxS 
        samt summan av dessa, kallat PFAS-4. Gränsvärdena varierar beroende på livsmedelskategori.</p>
       
        <h3>Vilka åtgärder vidtas vid höga PFAS-halter?</h3>
      <p>
        Vid höga halter av PFAS i livsmedel eller dricksvatten kan myndigheter vidta
        åtgärder såsom att informera allmänheten, genomföra sanering eller ta bort produkter
        från marknaden. För dricksvatten träder nya riktlinjer i kraft den 1 januari 2026.
      </p>
     
        </div>
      </div>
      <div className="faq-2">
      <div className="faq-section-3">
  <div className="faq-section__text">
    <h3>Varför är appen användbar för vanliga användare?</h3>
    <p>
      Appen är designad för att ge alla medborgare insikt i PFAS-nivåerna i hela Sverige. 
      Den gör det möjligt att:
    </p>
    <ul>
      <li>Få information om PFAS-nivåer i ditt område.</li>
      <li>Förstå hur höga PFAS-nivåer kan påverka din hälsa och miljö.</li>
      <li>Följa myndigheternas åtgärder för att hantera PFAS.</li>
      <li>Vidta nödvändiga åtgärder, som att använda vattenfilter eller anpassa konsumtionen av livsmedel.</li>
    </ul>
  </div>
 
</div>
      <div className="faq-section-4">
  <div className="faq-section__text">
    <h3>Hur fungerar behörigheten i appen?</h3>
    <p>
      Endast administratörer från länsstyrelser kan redigera data. Till exempel har 
      en administratör från Stockholms länsstyrelse endast åtkomst till PFAS-data för Stockholm. 
      Detta säkerställer att varje länsstyrelse endast hanterar sina egna data och undviker konflikter.
    </p>
    <h3>Hur skyddas data i appen?</h3>
    <p>
      Appen använder säker autentisering för att logga in administratörer. All data lagras
      säkert och är skyddad med strikta säkerhetsregler. Endast behöriga användare kan redigera
      data, och all aktivitet loggas för att säkerställa spårbarhet.
    </p>
  </div>
  </div>
</div>




     
    </div>
    </>
  )
}

export default FaqPage;