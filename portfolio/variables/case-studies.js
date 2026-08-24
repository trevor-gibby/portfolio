const componentDefinition = `<Accordion
  data-classes=""
  data-skip-auto-expand-tf=""
>
  <data-item>
    <data-header>
      ...
    </data-header>
    <data-body>
      ...
    </data-body>
  </data-item>
</Accordion>`

const componentTemplate = `<div id="accordion-{el_id}" class="wi-accordion {classes=}">
  {loop:item}
  <div class="accordion-item" id="heading-{el_id}-{loop_count}">
    <h3 class="h6 accordion-header">
      <button
        class="accordion-button {chunk:collapse_all}{chunk:collapsed}{/chunk:collapsed}{/chunk:collapse_all}"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapse-{el_id}-{loop_count}"
        aria-expanded="false"
        aria-controls="collapse-{el_id}-{loop_count}"
      >
        {header}
      </button>
    </h3>
    <div
      id="collapse-{el_id}-{loop_count}"
      class="accordion-collapse collapse {chunk:show_none}{chunk:show}{/chunk:show}{/chunk:show_none}"
      aria-labelledby="heading-{el_id}-{loop_count}"
      data-bs-parent="#accordion-{el_id}"
    >
      <div class="accordion-body">
        {body}
      </div>
    </div>
  </div>
  {/loop:item}
</div>`

const componentStyles = `.wi-accordion {
  .accordion-item {
    border: none;
    background-color: transparent;
    border-bottom: 1px solid rgba(0, 0, 0, 0.20);

    .accordion-header {
      font-size: 1.125rem;
      font-family: var(--font-secondary);
      font-weight: 600;
    }
  }
}
// ...continues`

const modernizedController = `<?php
$config = [
    'service' => $this->resolveService('Catalog:Item'),

    'request' => [
        'required_parameters' => [
            'item_id',
        ],
        'on_missing' => [
            'route' => 'catalog.items.index',
        ],
    ],

    'navigation' => [
        'source' => [
            'scope' => 'user_managed',
        ],
        'label_field' => 'display_name',
        'destination' => [
            'route' => 'catalog.items.edit',
            'parameters' => [
                'item_id' => 'id',
            ],
        ],
        'selected_parameter' => 'item_id',
    ],

    'resources' => [
        'item' => function ($controller, $service, $request) {
            return $service->find([
                'id' => $request->validatedQuery('item_id'),
                'include' => [
                    'related_options',
                ],
                'presentation' => 'form',
            ]);
        },
    ],

    'page' => [
        'configure' => function (
            $controller,
            $service,
            $request,
            $resources
        ) {
            $item = $resources['item'];

            $controller->setPageTitle($item['display_name']);
            $controller->setNavigationLabel(
                'catalog.items.edit',
                $item['display_name']
            );
        },
    ],

    'operation' => [
        'type' => 'update',
        'resource' => 'item',

        'form' => [
            'heading' => 'Edit Item',
            'identifier' => 'item',
            'submit_label' => 'Save Changes',
        ],

        'dialog' => [
            'size' => 'large',
        ],

        'feedback' => [
            'success' => [
                'message' => '{display_name} was updated successfully.',
                'activity' => [
                    'route' => 'catalog.items.edit',
                    'parameters' => [
                        'item_id' => '{id}',
                    ],
                    'message' => 'Updated item: {display_name}',
                ],
                'refresh_target' => 'catalog-item-list',
            ],
            'error' => [
                'message' => 'The item could not be updated.',
            ],
        ],
    ],
];

$result = $this->runConfiguredController($config);

$view = $result['operation']['view']
    ?? '<div class="error-state">'
        . '<h1>Unable to Load</h1>'
        . '<p>Please try again later.</p>'
        . '</div>';

$this->viewData = [
    'content' => $view,
];`

const modernizedView = `<div class="col-12">
  {view}
</div>`

export const caseStudies = [
  {
    slug: 'operations-platform-for-agencies',
    title: 'Operations Platform for Agencies',
    status: 'Independent in-progress prototype',
    context: 'Personal product prototype',
    accent: '#fa75a8',
    featured: true,
    summary: 'A 0→1 operations platform built around the account hierarchies and communication workflows that agency teams actually manage.',
    homepage: {
      problem: 'Generic CRM and project tools do not cleanly model franchise brands, locations, and the relationships between them.',
      ownership: 'I own the product direction, data model, architecture, implementation, and verification.',
      outcome: 'Two working iterations now support core CRM, scoped access, team administration, and Gmail-based communication workflows.'
    },
    intro: 'I first explored this idea as a capstone project. I am now rebuilding it independently with a stronger data model and a modern TypeScript stack. It is not a production system or a company-sponsored product.',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Auth.js', 'Jest'],
    image: '/images/mywork/canopy/canopy-4.png',
    imageAlt: 'Dark operations-platform interface showing a nested account hierarchy with filters and status labels',
    gallery: [
      {
        image: '/images/mywork/canopy/canopy-4.png',
        alt: 'Nested account hierarchy with primary and sub-account rows',
        caption: 'A single hierarchy for primary accounts and recursively nested sub-accounts.'
      },
      {
        image: '/images/mywork/canopy/canopy-5.png',
        alt: 'Primary account management screen with status and industry cards',
        caption: 'Account-level CRM workflows with status, search, and role-aware actions.'
      },
      {
        image: '/images/mywork/canopy/canopy-3.png',
        alt: 'Contact detail screen with linked accounts, custom attributes, and activity timeline',
        caption: 'Contacts can connect to multiple account levels while keeping custom fields and activity in one place.'
      },
      {
        image: '/images/mywork/canopy/canopy-2.png',
        alt: 'Gmail workspace embedded in a contact record',
        caption: 'A connected Gmail workspace keeps client communication inside the CRM context.'
      }
    ],
    overview: {
      problem: 'Most general-purpose tools force agency teams to flatten franchise-brand and location relationships or split them across disconnected records.',
      stakes: 'The data model has to stay flexible enough for different client structures while preserving clear access boundaries and future project-management relationships.',
      ownership: 'I set the product direction and own the schema, architecture, user experience, implementation, documentation, and test strategy.',
      outcome: 'The current rebuild has working account, sub-account, contact, custom-field, event-log, access-control, user/team, and Gmail communication flows.'
    },
    architecture: [
      {
        title: 'Flexible CRM relationships',
        description: 'Primary accounts can contain recursively nested sub-accounts. Contacts remain independent and can connect to more than one account or sub-account.'
      },
      {
        title: 'Relational foundation',
        description: 'PostgreSQL and Prisma make the relationships explicit and leave room for CRM records to connect cleanly with a future project-management service.'
      },
      {
        title: 'Scoped access',
        description: 'Tenant, role, team, and entity scopes are part of the application model instead of being treated as a UI-only concern.'
      },
      {
        title: 'Connected communication',
        description: 'Gmail connections, shared threads, communication logging, and reminders place conversations beside the people and accounts they affect.'
      }
    ],
    decisions: [
      'Rebuilt the original Pages Router JavaScript application with the Next.js App Router and strict TypeScript.',
      'Replaced MySQL and raw queries with PostgreSQL and Prisma to make the evolving relational model easier to reason about and migrate.',
      'Redesigned the account model around primary accounts, recursive sub-accounts, and many-to-many contact relationships.',
      'Used AI-assisted development to accelerate implementation, refactoring, documentation, and verification while retaining ownership of product and architecture decisions.'
    ],
    constraints: [
      'This is an independent, in-progress prototype with no public demo and no production adoption claim.',
      'The schema needs to serve current CRM workflows without prematurely locking in every future project-management and financial workflow.',
      'Access control crosses tenants, roles, teams, accounts, contacts, and connected communication data, so isolation has to be enforced below the interface layer.'
    ],
    evidence: [
      'The audited repository contains 23 route-backed screens, including account, sub-account, contact, communication, Gmail, user, team, role, custom-field, and integration settings flows.',
      'The current Prisma schema contains 37 models covering identity, access, integrations, CRM relationships, communications, reminders, and supporting join records.',
      'The repository includes 71 automated test files across actions, routes, UI components, permissions, CRM utilities, Gmail, and integration behavior; all 499 tests passed in the read-only audit.',
      'The repository lint check and production build both completed successfully in an isolated read-only audit workspace.',
      'All portfolio screenshots use approved demo data. The source repository remains private.'
    ],
    reflection: {
      learned: 'The rebuild reinforced that the hard part is not choosing a newer stack. It is making the domain model clearer so the interface, permissions, integrations, and future services can grow from the same foundation.',
      next: 'I would continue validating the model through real workflow usage before expanding the project-management and financial areas. The prototype is intentionally presented as in progress.'
    }
  },
  {
    slug: 'oak-component-engine',
    title: 'Oak Component Engine',
    status: 'Shipped production capability',
    context: 'Ninthroot · Oak CMS',
    accent: '#f9b3d0',
    featured: true,
    summary: 'A reusable component system that replaced repeated page markup with understandable, centrally managed CMS capabilities.',
    homepage: {
      problem: 'Repeated HTML structures with unique content made each new site slower to implement and harder to update.',
      ownership: 'I designed and built the syntax, definition UI, rendering engine, editor snippets, and conditional template behavior.',
      outcome: 'It cut new-site implementation time by approximately 50% and became the primary implementation method for new Oak CMS sites.'
    },
    intro: 'The existing widget system was not the right fit for repeated site-layer structures. I built a smaller component model that worked with the CMS the team already used instead of introducing a separate front-end application stack.',
    technologies: ['PHP', 'HTML', 'SCSS', 'CMS Architecture', 'Developer Tooling'],
    preview: ['XML-style content syntax', 'Central component definitions', 'Conditional template chunks', 'Reusable editor snippets'],
    overview: {
      problem: 'Developers were repeatedly rebuilding the same HTML structures while swapping page-specific content. Global changes still required touching many individual instances.',
      stakes: 'Implementation time, consistency, and content-update turnaround all suffered, but the replacement still had to feel natural inside the established Oak CMS workflow.',
      ownership: 'I designed and implemented the complete capability: authoring syntax, admin definition UI, rendering behavior, editor snippets, loops, and conditional template functionality.',
      outcome: 'The engine reduced new-site implementation time by approximately 50% and is now used by all Ninthroot developers as the primary method for new Oak CMS sites.'
    },
    architecture: [
      {
        title: 'Content-facing syntax',
        description: 'Editors work with a concise XML-style component tag and structured data fields rather than duplicating full presentation markup.'
      },
      {
        title: 'Central definitions',
        description: 'Each component definition owns its HTML and styling contract, so sitewide updates can be made once instead of repeated across every page instance.'
      },
      {
        title: 'Template rendering',
        description: 'Loops, named data fields, and conditional chunks let one definition handle useful variations without forcing editors to understand the rendering logic.'
      },
      {
        title: 'Cross-site reuse',
        description: 'Definitions can be shared between sites, making established components portable while still allowing brand-specific presentation.'
      }
    ],
    decisions: [
      'Used a small CMS-native component language instead of adding React to a legacy rendering platform.',
      'Kept content and presentation separate so non-technical teammates could change options and copy without editing the underlying structure.',
      'Built conditional and loop behavior into the definition layer so the same component could cover real site variations.',
      'Added editor snippets and a definition UI so adoption did not depend on developers memorizing syntax.'
    ],
    constraints: [
      'The capability had to fit an established CMS and deployment model without introducing a second runtime.',
      'The syntax needed to be expressive for developers but understandable enough for content-focused teammates.',
      'Reuse could not erase the brand and layout differences between client sites.'
    ],
    evidence: [
      'Approximately 50% reduction in new-site implementation time.',
      'Used as the primary implementation method for all new Oak CMS sites.',
      'Adopted by all Ninthroot developers with minimal training.',
      'Used across dozens of sites, typically with 10 to 50+ components per site.',
      'Non-technical team members can update component content and options without editing the underlying structure.'
    ],
    reflection: {
      learned: 'The useful abstraction was not a bigger framework. It was a focused layer that matched the CMS, the team, and the recurring work closely enough to remove repetition.',
      next: 'I would keep strengthening validation and authoring feedback as the component catalog grows, while protecting the simple mental model that made the system easy to adopt.'
    },
    codeSamples: [
      {
        label: 'Illustrative CMS component definition',
        language: 'html',
        note: 'This example shows the public component syntax and omits site-specific content.',
        code: componentDefinition
      },
      {
        label: 'Illustrative component template',
        language: 'html',
        note: 'The definition maps named fields, loops, and conditional chunks into shared markup.',
        code: componentTemplate
      },
      {
        label: 'Illustrative styling excerpt',
        language: 'scss',
        note: 'Presentation stays with the reusable definition while each site can apply its own variables and brand rules.',
        code: componentStyles
      }
    ]
  },
  {
    slug: 'chestnut-emergency-hosting',
    title: 'Chestnut Emergency Hosting',
    status: 'Internal operational-resilience system',
    context: 'Ninthroot · Business continuity',
    accent: '#b989ff',
    featured: true,
    summary: 'A low-cost continuity layer that keeps essential client pages and contact paths available during a primary-host outage.',
    homepage: {
      problem: 'A 24-hour hosting-provider outage exposed the risk of relying on a single production host.',
      ownership: 'I helped lead the emergency response, documented the recovery process, then designed the longer-term continuity system.',
      outcome: 'The system keeps a viable backup for all clients for a few dollars per month and reduces activation to two intentional operator actions.'
    },
    intro: 'During the outage, I created an emergency static-site process, documented deployment steps, and helped coordinate temporary pages and DNS changes. Afterward, I designed a more sustainable backup that preserves only the capabilities clients need during an outage.',
    technologies: ['Node.js', 'EJS', 'AWS Step Functions', 'Lambda', 'EventBridge', 'SNS'],
    preview: ['Scheduled data synchronization', 'Normally powered-off backup host', 'Emergency brand and location pages', 'SMTP contact capability'],
    overview: {
      problem: 'A major provider outage left client sites without an independent continuity path.',
      stakes: 'Clients still needed a public landing page, current location information, and a working contact route, but a full production replica would add ongoing cost and maintenance.',
      ownership: 'I moved from rapid incident response to designing the application flow, AWS orchestration, synchronization behavior, activation process, and team documentation.',
      outcome: 'Chestnut maintains a viable backup for all clients for a few dollars per month. Operators can start the standby server, update client DNS records, and make essential pages available through a documented process.'
    },
    architecture: [
      {
        title: 'Scheduled orchestration',
        description: 'EventBridge starts a Step Functions workflow that checks the backup server, starts it when needed, runs synchronization, and returns it to standby.'
      },
      {
        title: 'Application snapshots',
        description: 'A Node.js and EJS application retrieves approved Oak CMS data, filters live locations, and writes per-site JSON used by emergency pages.'
      },
      {
        title: 'Cost control',
        description: 'The server normally remains powered off. Scheduled refresh windows keep data current without paying for a complete always-on replica.'
      },
      {
        title: 'Focused continuity',
        description: 'The fallback preserves landing pages, location pages, branding flexibility, and SMTP contact capability rather than recreating the full CMS.'
      }
    ],
    decisions: [
      'Preserved only the minimum customer-facing capabilities required during an outage instead of duplicating the complete production platform.',
      'Used Step Functions and scheduled server power control to balance recovery readiness against monthly infrastructure cost.',
      'Stored normalized per-site snapshots so emergency rendering did not depend on the primary CMS remaining available.',
      'Documented setup, maintenance, and activation so response did not depend on one person.'
    ],
    constraints: [
      'The continuity system had to remain independent of the primary CMS host.',
      'It needed to support many client brands while avoiding client-specific code in the shared core.',
      'Ongoing infrastructure cost needed to stay proportionate to an emergency-only system.'
    ],
    evidence: [
      'The initial incident lasted approximately 24 hours.',
      'The current continuity layer supports essential landing pages, location pages, and an SMTP contact form.',
      'Automated synchronization makes onboarding a new backup site a repeatable process while preserving room for brand customization.',
      'The operating cost is only a few dollars per month for all client backup sites.',
      'Activation is reduced to starting the Chestnut server and updating client DNS records through two intentional operator actions.'
    ],
    reflection: {
      learned: 'The outage made the tradeoff concrete: useful resilience is not the same as an expensive full replica. The right system protects the customer path that matters and makes recovery understandable to the team.',
      next: 'I would keep testing activation and recovery procedures regularly so the operational process stays as dependable as the architecture.'
    },
    diagram: true
  },
  {
    slug: 'incremental-oak-modernization',
    title: 'Incremental Oak Modernization',
    status: 'Ongoing production-platform modernization',
    context: 'Ninthroot · Oak CMS',
    accent: '#64f5af',
    featured: true,
    summary: 'A practical modernization program for a business-critical PHP platform where a rewrite was not the highest-value decision.',
    homepage: {
      problem: 'Legacy controllers, views, data access, and documentation had grown inconsistent across a long-lived CMS.',
      ownership: 'I led compatibility work and introduced repeatable controller, view, data, documentation, and developer-instruction patterns.',
      outcome: 'All CMS instances now run on PHP 8.4, with 50 standardized controllers, 20 updated views, and 3 modules on a structured ORM architecture.'
    },
    intro: 'The goal was not to make the platform look new on paper. It was to reduce the cost and risk of changing a system the business already depended on, one useful boundary at a time.',
    technologies: ['PHP 8.4', 'ORM Architecture', 'MySQL', 'Structured Data', 'Documentation'],
    preview: ['PHP 7.3 → 8.4', 'Standard controller configuration', 'Reusable helpers', 'Agent-ready development guidance'],
    overview: {
      problem: 'Controllers and views followed inconsistent patterns, repeated orchestration and UI logic, and relied on limited documentation.',
      stakes: 'The CMS supports production sites, so modernization had to improve maintainability without disrupting established behavior or forcing a high-risk rewrite.',
      ownership: 'I led the PHP migration and built repeatable controller, helper, structured-data, UI, documentation, and development-instruction patterns.',
      outcome: 'All CMS instances were updated to PHP 8.4 and tested for compatibility. The modernization now includes 50 standardized controllers, 20 updated views, and 3 modules migrated to a structured ORM architecture.'
    },
    architecture: [
      {
        title: 'Configuration over repetition',
        description: 'Controllers declare common request, resource, navigation, form, feedback, and activity behavior through a shared runner.'
      },
      {
        title: 'Reusable orchestration',
        description: 'Helper functions move repeated control flow into tested, understandable boundaries while keeping module-specific decisions visible.'
      },
      {
        title: 'Structured data',
        description: 'Three modules now use a structured ORM architecture, reducing direct query variation and clarifying how data reaches the view layer.'
      },
      {
        title: 'Documented conventions',
        description: 'Updated documentation and agent-ready instructions make the preferred patterns easier for developers and coding tools to follow consistently.'
      }
    ],
    decisions: [
      'Migrated from PHP 7.3 to PHP 8.4 while preserving production behavior and testing CMS instances for compatibility.',
      'Standardized controllers through shared configuration and helper functions instead of rewriting the application around a new framework.',
      'Improved the view contract by passing structured data and reducing repeated UI orchestration.',
      'Added documentation and development instructions alongside code changes so the new patterns could remain consistent.'
    ],
    constraints: [
      'Production compatibility mattered more than adopting a fashionable architecture.',
      'The work had to coexist with modules that had not yet been modernized.',
      'Public examples cannot include private source, client data, or internal implementation details.'
    ],
    evidence: [
      'All CMS instances updated from PHP 7.3 to PHP 8.4 and tested for compatibility.',
      '50 controllers adopted a standardized structure with reusable helper functions.',
      '20 views updated with structured data and improved UI.',
      '3 modules migrated to a structured ORM architecture.'
    ],
    reflection: {
      learned: 'A legacy system becomes easier to change when each improvement leaves behind a clearer pattern. Consistency, documentation, and compatibility work can create more business value than a rewrite proposal.',
      next: 'I would continue migrating modules where the repeated maintenance cost justifies it, using the same incremental approach and keeping production behavior measurable.'
    },
    codeSamples: [
      {
        label: 'Illustrative sanitized controller',
        language: 'php',
        note: 'Names and implementation details differ from the production system. This is an illustrative example, not verbatim production code.',
        code: modernizedController
      },
      {
        label: 'Illustrative sanitized view',
        language: 'html',
        note: 'The view receives a prepared rendering result instead of repeating controller orchestration.',
        code: modernizedView
      }
    ]
  }
]

export function getCaseStudy(slug) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug)
}
