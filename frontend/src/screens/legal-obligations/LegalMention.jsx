import React from "react";
import { Container, Card } from "react-bootstrap";

const LegalMention = () => {
  return (
    <Container className='mt-5'>
      <Card>
        <Card.Body>
          <Card.Title>Mentions Légales</Card.Title>
          <div>
            <h5>1. Informations légales :</h5>
            <div>
              <p>Raison sociale : Adamoauto.com</p>
              <p>Adresse : 14 chemin des closeaux, 94440 Villecresnes</p>
              <p>Téléphone : 07 51 30 47 04</p>
              <p>Email : info@adamoautos.com</p>
              <p>Directeur de la publication : ADAMOU Traoré</p>
            </div>
          </div>

          <div>
            <h5>Site édité par webcom</h5>
          </div>

          <div>
            <h5>2. Hébergement :</h5>
            <div>
              <p>Nom : Heroku</p>
              <p>
                Adresse : 415 Mission Street Suite 300 San Francisco, CA 94105
              </p>
            </div>
          </div>

          <div>
            <h5>3. Propriété intellectuelle :</h5>
            <div>
              <p>
                Le contenu de ce site web, incluant les textes, images, vidéos
                et autres éléments, est la propriété de [Nom de l'entreprise] ou
                de ses fournisseurs de contenu. Toute reproduction, distribution
                ou utilisation non autorisée est interdite.
              </p>
            </div>
          </div>

          <div>
            <h5>4. Responsabilité :</h5>
            <div>
              <p>
                Adamoautos.com ne peut être tenue responsable de l'utilisation
                faite du contenu présent sur ce site. L'utilisation des
                informations présentes sur ce site se fait sous la seule
                responsabilité de l'utilisateur.
              </p>
            </div>
          </div>

          <div>
            <h5>5. Loi applicable et juridiction compétente :</h5>
            <div>
              <p>
                Les présentes mentions légales sont soumises au droit français.
                En cas de litige, les tribunaux compétents seront ceux du lieu
                de résidence du défendeur ou, en cas de litige avec un
                professionnel, ceux du lieu de son siège social.
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LegalMention;
