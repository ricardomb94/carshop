import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const articles = [
  {
    title: "Article 1 : Objet",
    content: `Les présentes conditions générales d'utilisation (ci-après les "CGU") ont pour objet de définir les conditions et modalités d'utilisation du site web adamoautos.com (ci-après le "Site") par tout utilisateur (ci-après l'"Utilisateur").`,
    id: "article-1",
  },
  {
    title: "Article 2 : Accès et utilisation du Site",
    content: `Le Site est accessible gratuitement à tout Utilisateur disposant d'une connexion internet. L'Utilisateur est responsable de l'installation et de la maintenance de son matériel et de ses logiciels nécessaires à l'accès au Site.

    L'Utilisateur s'engage à utiliser le Site de manière loyale et conforme aux présentes CGU. Il s'interdit notamment de :

    - diffuser des contenus contraires à l'ordre public ou aux bonnes mœurs ;
    - diffuser des informations fausses ou trompeuses ;
    - porter atteinte aux droits des tiers ;
    - utiliser le Site à des fins commerciales sans l'autorisation préalable de Adamou TRAORE.`,
    id: "article-2",
  },
  {
    title: "Article 3 : Propriété intellectuelle",
    content: `Le contenu du Site, notamment les textes, images, photos, logos, marques et tout autre élément protégé par les droits de propriété intellectuelle, est la propriété exclusive de Adamou TRAORE ou de ses ayants droit.

    L'Utilisateur s'engage à ne pas reproduire, représenter, modifier, diffuser, adapter, traduire, ou exploiter de quelque manière que ce soit, tout ou partie du contenu du Site sans l'autorisation préalable et écrite de Adamou TRAORE.`,
    id: "article-3",
  },
  {
    title: "Article 4 : Responsabilité",
    content: `Adamou TRAORE s'engage à mettre en œuvre tous les moyens nécessaires pour assurer la sécurité et l'accès au Site. Cependant, sa responsabilité ne peut être engagée en cas de :

    - interruption du Site pour des raisons de maintenance ou de force majeure ;
    - dysfonctionnement du Site ;
    - dommage causé à l'ordinateur de l'Utilisateur du fait de l'utilisation du Site ;
    - perte de données.

    L'Utilisateur est responsable de l'utilisation qu'il fait du Site et des contenus qu'il diffuse. Il s'engage à garantir Adamou TRAORE contre toute réclamation, action ou recours de tiers du fait de l'utilisation du Site par l'Utilisateur.`,
    id: "article-4",
  },
  {
    title: "Article 5 : Liens hypertextes",
    content: `Le Site peut contenir des liens hypertextes vers d'autres sites web. Adamou TRAORE ne peut être tenu responsable du contenu de ces sites web et du préjudice subi par l'Utilisateur du fait de l'utilisation de ces sites web.`,
    id: "article-5",
  },
  {
    title: "Article 6 : Modification des CGU",
    content: `Adamou TRAORE se réserve le droit de modifier les présentes CGU à tout moment. Les modifications seront applicables dès leur publication sur le Site.`,
    id: "article-6",
  },
  {
    title: "Article 7 : Loi applicable et juridiction compétente",
    content: `Les présentes CGU sont soumises au droit français. En cas de litige, les tribunaux de Paris seront seuls compétents.`,
    id: "article-7",
  },
];

const TermsAndConditions = () => {
  const [activeArticle, setActiveArticle] = useState(null);

  const handleArticleClick = (id) => {
    setActiveArticle(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Container className='mt-5'>
      <div className='text-center'>
        <h1>Conditions générales d'utilisation</h1>
      </div>
      <Row>
        <Col sm={3}>
          <ul className='list-unstyled'>
            {articles.map((article) => (
              <li key={article.id}>
                <a
                  href={"#" + article.id}
                  onClick={() => handleArticleClick(article.id)}
                >
                  {article.title}
                </a>
              </li>
            ))}
          </ul>
        </Col>
        <Col sm={9}>
          {articles.map((article) => (
            <div key={article.id} id={article.id}>
              <Card>
                <Card.Body>
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Text>{article.content}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default TermsAndConditions;
