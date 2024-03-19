<x-mail::message>
    <h1 style="color: #007bff;">Confirmation de participation à l'événement</h1>
    <p>Bonjour {{$nomOrganisateur}},</p>
    <p>Nous sommes ravis de vous informer que [Nom du Prestataire] a accepté votre invitation à participer à l'événement spécial que vous avez organisé. Nous sommes certains que leur participation ajoutera une valeur significative à l'événement et contribuera à son succès.</p>
    <p>Voici les détails de leur participation :</p>
    <ul>
        <li><strong>Prestataire :</strong> {{$nomprestataire}}</li>
        <li><strong>Événement :</strong> {{$evenement->nom}}</li>
        <li><strong>Date :</strong> {{$evenement->date}}</li>
        <li><strong>Heure :</strong> {{$evenement->heure}}</li>
        <li><strong>Lieu :</strong> {{$evenement->lieu}}</li>
    </ul>
    <p>Nous sommes impatients de vous accueillir tous les deux à l'événement et de passer un moment agréable ensemble. Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter.</p>
    <p>Merci beaucoup pour votre considération et votre participation. Nous avons hâte de vous voir à l'événement !</p>
    <p>Cordialement,<br> {{$nomprestataire}}</p>
</x-mail::message>
