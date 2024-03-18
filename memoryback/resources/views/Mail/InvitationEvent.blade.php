<x-mail::message>
    <h1 style="color: #007bff;">Invitation à notre événement spécial</h1>
    <p>Bonjour {{$prestaName}},</p>
    <p>Nous espérons que vous allez bien ! Nous sommes ravis de vous inviter à participer à notre événement spécial qui se déroulera le {{ $evenement->date }}. Nous croyons que votre présence ajoutera une valeur significative à cet événement et contribuera à son succès.</p>
    <p>Voici quelques détails sur l'événement :</p>
    <ul>
        <li><strong>Nom de l'événement :</strong> {{ $evenement->nom }}</li>
        <li><strong>Date :</strong> {{ $evenement->date }}</li>
        <li><strong>Heure :</strong> {{ $evenement->heure }}</li>
        <li><strong>Lieu :</strong> {{ $evenement->lieu }}</li>
    </ul>
    <p>Nous croyons que votre expertise et votre professionnalisme seront très appréciés par les participants. Veuillez confirmer votre présence dès que possible en répondant à cet e-mail.</p>
    <p>Nous sommes impatients de vous accueillir à notre événement et de passer un moment agréable ensemble. Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter.</p>
    <p>Merci beaucoup pour votre considération et votre participation. Nous avons hâte de vous voir à l'événement !</p>
    <h5 style="color: red;">Connectez-vous à votre compte pour confirmer votre présence</h5>
    <p>Cordialement,<br> L'équipe de l'événement</p>
</x-mail::message>
