export default function CGVPage() {
  return (
    <article className="prose prose-neutral max-w-none">
      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400 mb-4">
        Legal
      </p>
      <h1 className="text-[32px] font-medium text-neutral-900 tracking-[-0.02em] mb-2">
        Conditions Générales de Vente
      </h1>
      <p className="text-[14px] text-neutral-400 mb-8">Dernière mise à jour : Janvier 2026</p>

      <div className="space-y-8 text-[15px] text-neutral-600 leading-[1.8]">
        <section>
          <h2 className="text-[18px] font-semibold text-neutral-900 mb-3">Article 1 - Objet</h2>
          <p>
            Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre Relay et ses clients professionnels pour la fourniture du service de plateforme d'onboarding client sécurisé.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-neutral-900 mb-3">Article 2 - Services</h2>
          <p>
            Relay propose une plateforme SaaS permettant aux Managed Service Providers (MSPs) de collecter de manière sécurisée les identifiants, documents et informations d'accès de leurs clients via des portails d'intake personnalisés.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-neutral-900 mb-3">Article 3 - Tarification</h2>
          <p>
            Les tarifs sont communiqués sur demande et peuvent varier selon le nombre d'utilisateurs et les fonctionnalités souscrites. Les prix sont indiqués en euros hors taxes. La TVA applicable sera ajoutée au moment de la facturation.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-neutral-900 mb-3">Article 4 - Paiement</h2>
          <p>
            Le paiement est effectué par prélèvement automatique ou virement bancaire. Les factures sont émises mensuellement ou annuellement selon le plan choisi. Tout retard de paiement entraînera des pénalités de retard conformément à la loi.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-neutral-900 mb-3">Article 5 - Durée et Résiliation</h2>
          <p>
            L'abonnement est souscrit pour une durée initiale d'un mois ou d'un an selon le plan choisi, renouvelable tacitement. Chaque partie peut résilier le contrat avec un préavis de 30 jours avant la date de renouvellement.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-neutral-900 mb-3">Article 6 - Responsabilité</h2>
          <p>
            Relay s'engage à fournir un service conforme aux standards de l'industrie. Notre responsabilité est limitée au montant des sommes versées par le client au cours des 12 derniers mois. Relay ne peut être tenu responsable des dommages indirects.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-neutral-900 mb-3">Article 7 - Protection des Données</h2>
          <p>
            Relay traite les données personnelles conformément au RGPD. Les données des clients sont hébergées sur des serveurs sécurisés au sein de l'Union Européenne. Un accord de traitement des données (DPA) est disponible sur demande.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-neutral-900 mb-3">Article 8 - Propriété Intellectuelle</h2>
          <p>
            Relay conserve l'intégralité des droits de propriété intellectuelle sur la plateforme et ses composants. Le client bénéficie d'un droit d'utilisation non exclusif pendant la durée de son abonnement.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-neutral-900 mb-3">Article 9 - Droit Applicable</h2>
          <p>
            Les présentes CGV sont soumises au droit français. Tout litige relatif à leur interprétation ou leur exécution sera soumis aux tribunaux compétents de Paris.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-neutral-900 mb-3">Article 10 - Contact</h2>
          <p>
            Pour toute question concernant ces CGV, veuillez nous contacter à{" "}
            <a href="mailto:hello@getrelay.fr" className="text-[#3B82C4] hover:underline">
              hello@getrelay.fr
            </a>
          </p>
        </section>
      </div>
    </article>
  )
}
