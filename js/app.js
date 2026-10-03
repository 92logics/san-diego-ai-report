(function () {
  "use strict";

  var PORTAL = "https://sdbuynet.sandiegocounty.gov/";
  var BROWSE = "https://sdbuynet.sandiegocounty.gov/page.aspx/en/rfp/request_browse_public";
  var HIGHERGOV = "https://www.highergov.com/sl/contract-opportunity/ca-rfp-artificial-intelligence-ai-repor-73486313/";
  var CABIDS = "https://www.californiabids.com/government-agencies/san-diego/san-diego-county---purchasing-and-contracting-4144/15015035-artificial-intelligence-ai-report-writing-services-request-for-proposal.html";
  var EMAIL = "VanessaC.Rios@sdcounty.ca.gov";

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function ph(label) {
    return '<span class="ph">' + esc(label) + "</span>";
  }

  function tag() {
    return '<p class="tag">Scripted from public pages checked for this demo: BuyNet solicitation list, the CaliforniaBids notice page, and the HigherGov opportunity page. Not the full RFP file, which BuyNet holds behind supplier participation.</p>';
  }

  function reply(opts) {
    var html = "";
    if (opts.sample) {
      html += '<p class="sample-note">Labeled sample. Every figure is a placeholder. Not Probation data and not a county report.</p>';
    }
    if (opts.refuse) {
      html += '<p class="refuse">Refused. The public pages this prototype uses do not cover that, so it will not invent an answer or a report.</p>';
    }
    (opts.paragraphs || []).forEach(function (p) {
      html += "<p>" + p + "</p>";
    });
    if (opts.list && opts.list.length) {
      html += "<ul>" + opts.list.map(function (item) {
        return "<li>" + item + "</li>";
      }).join("") + "</ul>";
    }
    if (opts.report) html += opts.report;
    html += tag();
    return html;
  }

  function draftCard() {
    return (
      '<article class="report">' +
      '<h3>Draft report section</h3>' +
      '<p class="stamp">Draft only · not reviewed · not filed · not a county record</p>' +
      "<dl>" +
      "<dt>Subject</dt><dd>" + ph("Example Person A") + " — placeholder name</dd>" +
      "<dt>Police report</dt><dd>" + ph("PLACEHOLDER-PR-000") + " · date " + ph("PLACEHOLDER-DATE-A") + "</dd>" +
      "<dt>Case note</dt><dd>" + ph("PLACEHOLDER-CN-000") + " · date " + ph("PLACEHOLDER-DATE-B") + "</dd>" +
      "<dt>Transcript</dt><dd>" + ph("PLACEHOLDER-TR-000") + "</dd>" +
      "<dt>Address</dt><dd>" + ph("PLACEHOLDER-ADDRESS") + "</dd>" +
      "</dl>" +
      "<p>Summary, using only the placeholder packet: a sample officer contacted " +
      ph("Example Person A") + " at " + ph("PLACEHOLDER-ADDRESS") +
      ". A case note records an office contact and leaves the outcome blank. The transcript is one sample line and is not a real statement.</p>" +
      "<p>No recommendation, risk score, or disposition is written. The public scope says the solution must preserve human judgment and decision-making. This prototype cannot finalize a report.</p>" +
      "</article>"
    );
  }

  var intents = [
    {
      id: "scope",
      label: "What is in scope?",
      prompt: "What does the public notice say this solution must do?",
      keys: ["scope", "what does", "what is this", "solution", "purpose", "in scope", "report writing", "what must", "business day", "human judgment", "human judgement"],
      answer: function () {
        return reply({
          paragraphs: [
            "CaliforniaBids prints this scope (a stray leading character sits in front of the first word on that page): design, deliver, and maintain an artificial intelligence-enabled solution that streamlines County of San Diego Probation Department report preparation by reducing manual workload and supporting efficient data extraction, summarization, and drafting. It must operate in line with County oversight, security, and privacy requirements, and be configured to enhance officer effectiveness while preserving human judgment and decision-making.",
            "HigherGov’s public summary of the same opportunity (BPM013365) adds these work points, which this demo treats as that page’s summary, not as a substitute for the RFP file: AI-assisted draft report sections within one business day of officer submission; extraction and summarization from police reports, case notes, and transcripts; human-in-the-loop review before finalization; checks for missing or inconsistent data; and workflow support for supervisory review and approval."
          ]
        });
      }
    },
    {
      id: "buyer",
      label: "Who is the buyer?",
      prompt: "Who is the buyer and who is the contact?",
      keys: ["buyer", "contact", "vanessa", "email", "who", "purchasing", "phone", "address", "rios"],
      answer: function () {
        return reply({
          paragraphs: [
            "Buyer on the CaliforniaBids page: San Diego County — Purchasing and Contracting, 5560 Overland Ave Ste 270, San Diego, CA 92123-1204. Office telephone listed there: 858-505-6367. The same page names Vanessa Rios, telephone 858-201-0931.",
            "Email on the HigherGov opportunity page: vanessac.rios@sdcounty.ca.gov. The 92 Logics CRM lead records the same address as " + esc(EMAIL) + ". The using department named on the public pages is the Department of Probation.",
            "Questions about a proposal go through BuyNet. This prototype does not send email."
          ]
        });
      }
    },
    {
      id: "deadline",
      label: "What is the deadline?",
      prompt: "What is the proposal deadline and the other dates?",
      keys: ["deadline", "due", "when", "date", "october", "pre-proposal", "preproposal", "conference", "question", "q&a", "qa"],
      answer: function () {
        return reply({
          paragraphs: [
            "BuyNet’s public solicitation list shows RFx BPM013365 ending 10/16/2026 3:00:00 PM, status Open when this demo was checked, begin date 9/1/2026 10:00:00 AM. CaliforniaBids lists the bid date and time as 10/16/26 3:00 PM. The 92 Logics CRM note records that deadline as 16 October 2026, 3:00 PM PT. The BuyNet table itself does not print a time-zone label.",
            "Pre-proposal conference: 8 September 2026 at 9:00 a.m., video/teleconference on Microsoft Teams. HigherGov says attendance is encouraged but not mandatory. CaliforniaBids lists the same prebid date and time.",
            "CaliforniaBids notes: questions due by 14 September 2026 prior to 5:00 PM. That page also says some or all of the solicitation has local funding and that additional requirements may apply. It does not state the time zone on that questions deadline."
          ]
        });
      }
    },
    {
      id: "term",
      label: "Contract length?",
      prompt: "What term and place of performance does the public summary give?",
      keys: ["term", "option year", "2032", "period of", "countywide", "place of performance", "how long", "self-certification", "small-local", "small local", "experience"],
      answer: function () {
        return reply({
          paragraphs: [
            "HigherGov’s summary says the contract is anticipated to have an initial term of eighteen (18) months with four (4) one-year options, potentially extending through 30 June 2032. It says services would be provided countywide across Probation offices and facilities in San Diego.",
            "The same summary says offerors must show experience providing AI-enabled solutions in justice or government environments, comply with applicable County policies on data security, privacy, and AI governance, and are encouraged to complete a Small-Local Business Self-Certification form. Those points are from the HigherGov page, not from a downloaded statement of work."
          ]
        });
      }
    },
    {
      id: "volume",
      label: "How many reports?",
      prompt: "How many reports per month does the notice mention?",
      keys: ["600", "700", "how many", "volume", "per month", "caseload", "workload number"],
      answer: function () {
        return reply({
          paragraphs: [
            "HigherGov’s public summary says the workflow supports timely supervisory review and approval for approximately 600–700 reports per month. That figure is on the aggregator page. It is not a live Probation count, and this demo does not measure or forecast it.",
            "No other volume, staffing count, or processing-time statistic is used here. The one-business-day drafting point is also from that same HigherGov summary, not from a clock in this prototype."
          ]
        });
      }
    },
    {
      id: "extract",
      label: "Extract the packet",
      prompt: "Extract fields from the placeholder packet.",
      keys: ["extract", "extraction", "fields", "pull", "identify the"],
      answer: function () {
        return reply({
          sample: true,
          paragraphs: [
            "Extraction sample against the three placeholder sources only. The notice describes extraction from police reports, case notes, and transcripts. It does not publish a field list, so these labels are demo labels, not a County schema."
          ],
          list: [
            "Subject name: " + ph("Example Person A") + " (placeholder), same label on the police report and the case note",
            "Police report no.: " + ph("PLACEHOLDER-PR-000") + " · date label " + ph("PLACEHOLDER-DATE-A"),
            "Case note no.: " + ph("PLACEHOLDER-CN-000") + " · date label " + ph("PLACEHOLDER-DATE-B"),
            "Address: " + ph("PLACEHOLDER-ADDRESS"),
            "Transcript clip: " + ph("PLACEHOLDER-TR-000") + " · one sample line",
            "Outcome: blank on the case note (left blank on purpose)"
          ]
        });
      }
    },
    {
      id: "summarize",
      label: "Summarize the packet",
      prompt: "Summarize the placeholder packet.",
      keys: ["summar", "summary", "short version"],
      answer: function () {
        return reply({
          sample: true,
          paragraphs: [
            "Summary sample, one paragraph, placeholder facts only: a sample officer contacted Example Person A at PLACEHOLDER-ADDRESS (police report PLACEHOLDER-PR-000, date label PLACEHOLDER-DATE-A). A case note (PLACEHOLDER-CN-000, date label PLACEHOLDER-DATE-B) records an office contact and leaves the outcome blank. Transcript PLACEHOLDER-TR-000 is a single sample line and is not a real statement.",
            "The public scope includes summarization as part of report preparation. This paragraph is the entire summary. Nothing was added."
          ]
        });
      }
    },
    {
      id: "draft",
      label: "Draft a section",
      prompt: "Draft a report section from the placeholder packet.",
      keys: ["draft", "write a report", "report section", "prepare a report", "generate"],
      answer: function () {
        return reply({
          sample: true,
          paragraphs: [
            "Draft sample only. HigherGov’s summary says AI-assisted draft sections come before human review and are not final. CaliforniaBids says human judgment and decision-making stay in place. This card is not a probation report and every figure is a placeholder."
          ],
          report: draftCard()
        });
      }
    },
    {
      id: "validate",
      label: "Check for gaps",
      prompt: "Check the placeholder packet for missing or inconsistent data.",
      keys: ["valid", "missing", "inconsistent", "gap", "check", "flag", "conflict"],
      answer: function () {
        return reply({
          sample: true,
          paragraphs: [
            "Validation sample. HigherGov’s summary says the work includes automated checks for missing or inconsistent data. These two flags were planted in the placeholder packet so the sample has something to show. They are not County findings."
          ],
          list: [
            "Missing: outcome field on case note " + ph("PLACEHOLDER-CN-000") + " is blank",
            "Inconsistent labels: police-report date " + ph("PLACEHOLDER-DATE-A") + " and case-note date " + ph("PLACEHOLDER-DATE-B") + " are different placeholder labels",
            "Not flagged: the subject label matches on the police report and the case note, and both are still placeholders",
            "Not checked: anything outside the three placeholder sources"
          ]
        });
      }
    },
    {
      id: "review",
      label: "Can a person finalize?",
      prompt: "Route this draft for human review and finalize it.",
      keys: ["human review", "finalize", "finalise", "supervisor", "sign off", "submit the report", "mark it final", "file it"],
      answer: function () {
        return reply({
          refuse: true,
          paragraphs: [
            "The public pages require human review before finalization and say human judgment and decision-making are preserved. This prototype has no officer, no supervisor, and no Probation system, so it cannot mark a draft reviewed, approved, or filed.",
            "What the pages do describe, and what the sample buttons illustrate, is a path of extract, summarize, draft, flag missing or inconsistent data, then stop. HigherGov’s summary also mentions supervisory review and approval workflow for the approximate monthly volume stated on that page. This screen does not implement that workflow."
          ]
        });
      }
    },
    {
      id: "portal",
      label: "Where is the notice?",
      prompt: "Where is the official notice and what will this demo not open?",
      keys: ["buynet", "portal", "where is the", "where do i submit", "submit a proposal", "submit the proposal", "link", "notice url", "official", "rfp file", "attachment", "document"],
      answer: function () {
        return reply({
          paragraphs: [
            "Official portal: " + esc(PORTAL) + ". Public solicitation list: " + esc(BROWSE) + ". The row used here is RFx BPM013365, “RFP - ARTIFICIAL INTELLIGENCE (AI) REPORT WRITING SERVICES,” commodity Software, lot 1, round 1.",
            "BuyNet tells suppliers to participate in the RFx to see all information, submit questions, and submit proposals. This prototype does not log in and does not contain the statement of work, evaluation criteria, or attachments.",
            "Other public pages read for the script: HigherGov " + esc(HIGHERGOV) + " and CaliforniaBids " + esc(CABIDS) + "."
          ]
        });
      }
    }
  ];

  var refuses = [
    {
      keys: ["price", "pricing", "cost", "budget", "fee", "insurance", "bond", "dollar", "how much", "value", "quote a", "bid amount"],
      paragraphs: [
        "No price, budget, insurance limit, or contract value is stated on the BuyNet list row or the CaliforniaBids scope used here. HigherGov shows an experimental range marked as an AI estimate. This prototype will not repeat that range as the County’s figure and will not draft pricing."
      ]
    },
    {
      keys: ["cjis", "fbi", "hipaa", "soc 2", "soc2", "clets", "fips", "encryption", "nist", "fedramp", "it requirement", "control matrix", "data residency", "u.s. based", "us-based", "hosted"],
      paragraphs: [
        "The pages this demo uses say the solution must follow County oversight, security, and privacy requirements, and HigherGov’s summary mentions applicable County policies on data security, privacy, and AI governance. They do not publish the control text.",
        "This prototype will not invent CJIS, FBI, HIPAA, encryption, hosting, or residency rules, and it will not claim a compliance status."
      ]
    },
    {
      keys: ["write the bid", "write our bid", "write a proposal", "draft a proposal", "draft the proposal", "win the", "evaluation score", "scoring", "past performance", "cover letter"],
      paragraphs: [
        "This is not a bid desk. It will not draft proposal language, scoring strategy, or past-performance claims. Submittals go through BuyNet under the County’s instructions, which are not loaded here."
      ]
    },
    {
      keys: ["email vanessa", "send an email", "contact her", "write to vanessa", "outreach"],
      paragraphs: [
        "Contact on the public pages is Vanessa Rios at " + esc(EMAIL) + ". This prototype does not send email or draft an outreach message."
      ]
    },
    {
      keys: ["real case", "real police", "real person", "actual case", "probationer", "defendant", "inmate", "lookup", "look up", "my client", "paste", "here is the report", "here is a real", "police narrative", "risk score", "sentence", "recommend custody", "detain", "case number"],
      paragraphs: [
        "This prototype does not accept case facts, names of real people, or requests to score, sentence, or recommend custody. The only packet it will touch is the labeled placeholder packet already on this page."
      ]
    },
    {
      keys: ["salesforce", "tyler", "nectar", "power bi", "which model", "gpt model", "language model", "llm", "api key", "integrate with"],
      paragraphs: [
        "The public pages used here do not name a product, a model, or an integration. This prototype will not invent one."
      ]
    }
  ];

  function norm(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9&]+/g, " ").replace(/\s+/g, " ").trim();
  }

  function score(text, keys) {
    var n = 0;
    keys.forEach(function (k) {
      if (text.indexOf(k) !== -1) n += k.length;
    });
    return n;
  }

  function answerFor(raw) {
    var text = norm(raw);
    if (!text) {
      return reply({
        refuse: true,
        paragraphs: ["Type a question about the public notice, or use a sample prompt."]
      });
    }
    var i;
    var bestRefuse = null;
    var bestRefuseScore = 0;
    for (i = 0; i < refuses.length; i++) {
      var rs = score(text, refuses[i].keys);
      if (rs > bestRefuseScore) {
        bestRefuseScore = rs;
        bestRefuse = refuses[i];
      }
    }
    var best = null;
    var bestScore = 0;
    for (i = 0; i < intents.length; i++) {
      var s = score(text, intents[i].keys);
      if (s > bestScore) {
        bestScore = s;
        best = intents[i];
      }
    }
    var packetIds = { extract: 1, summarize: 1, draft: 1, validate: 1 };
    if (best && packetIds[best.id] && text.indexOf("placeholder") === -1 && bestRefuseScore >= 4) {
      return reply({ refuse: true, paragraphs: bestRefuse.paragraphs });
    }
    if (bestRefuse && bestRefuseScore >= bestScore && bestRefuseScore >= 4) {
      return reply({ refuse: true, paragraphs: bestRefuse.paragraphs });
    }
    if (best && packetIds[best.id] && text.indexOf("placeholder") === -1 && /\b(mr|ms|mrs|john|jane)\b/.test(text)) {
      return reply({
        refuse: true,
        paragraphs: [
          "This prototype does not draft from names or facts you type. The only packet it will use is the labeled placeholder packet on this page."
        ]
      });
    }
    if (best && bestScore >= 4) return best.answer();
    return reply({
      refuse: true,
      paragraphs: [
        "No scripted answer matches that. This prototype only restates the public notice pages for BPM013365 and runs the labeled placeholder packet (extract, summarize, draft, gap check). It will not guess."
      ]
    });
  }

  function addMessage(role, html) {
    var thread = document.getElementById("thread");
    var item = document.createElement("article");
    item.className = "msg " + role;
    var who = role === "user" ? "You" : "Scripted assistant";
    item.innerHTML = '<p class="who">' + who + "</p>" + (role === "user" ? "<p>" + esc(html) + "</p>" : html);
    thread.appendChild(item);
    item.scrollIntoView({ block: "nearest" });
  }

  function ask(text) {
    addMessage("user", text);
    addMessage("bot", answerFor(text));
  }

  var chips = document.getElementById("chips");
  intents.forEach(function (intent) {
    var b = document.createElement("button");
    b.type = "button";
    b.textContent = intent.label;
    b.addEventListener("click", function () { ask(intent.prompt); });
    chips.appendChild(b);
  });

  document.getElementById("composer").addEventListener("submit", function (e) {
    e.preventDefault();
    var box = document.getElementById("ask");
    var text = box.value.trim();
    if (!text) return;
    box.value = "";
    ask(text);
  });

  addMessage("bot", reply({
    paragraphs: [
      "This is a 92 Logics prototype of the report-writing assistance described for San Diego County BuyNet RFP BPM013365. It is not a County system and not a bid.",
      "Ask what the public pages cover, or run the placeholder packet: extract, summarize, draft a section, or check gaps. Drafts stay drafts. Pasted case facts are refused."
    ]
  }));
})();
