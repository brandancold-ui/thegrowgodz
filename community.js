(() => {
  "use strict";

  const communityEntries = [
    {
      id: "grow-godz-canopy",
      category: "grows",
      categoryLabel: "Grows",
      image: "assets/images/webp/cultivation/grow-godz-frosted-indoor-cannabis-canopy.webp",
      imageAlt: "Frosted indoor cannabis canopy from the Grow Godz cultivation build log",
      growerHandle: "@grow.godz",
      ownerLabel: "Grow Godz Build Log",
      strain: "Mule Fuel",
      stage: "Flower",
      caption: "A close look at canopy development, plant health, and the consistency behind the current indoor run.",
      externalLink: "https://instagram.com/grow.godz",
      externalLabel: "View @grow.godz",
      status: "Featured"
    },
    {
      id: "grow-godz-tent",
      category: "setups",
      categoryLabel: "Setups",
      image: "assets/images/webp/cultivation/grow-godz-indoor-cannabis-grow-tent-setup.webp",
      imageAlt: "Indoor grow tent and cultivation equipment from the Grow Godz build log",
      growerHandle: "@grow.godz",
      ownerLabel: "Grow Godz Build Log",
      strain: "Not shown",
      stage: "Indoor grow tent",
      caption: "The working environment behind the grow, documented with the equipment and layout visible."
    },
    {
      id: "grow-godz-harvest",
      category: "harvests",
      categoryLabel: "Harvests",
      image: "assets/images/webp/cultivation/grow-godz-trimmed-cannabis-harvest-closeup.webp",
      imageAlt: "Trimmed cannabis harvest close-up from the Grow Godz cultivation build log",
      growerHandle: "@grow.godz",
      ownerLabel: "Grow Godz Build Log",
      strain: "Not publicly listed",
      stage: "Post-harvest",
      caption: "A documented harvest detail focused on finish work, flower structure, and presentation."
    },
    {
      id: "grow-godz-reel",
      category: "reels",
      categoryLabel: "Reels",
      image: "assets/images/webp/lifestyle/grow-godz-cultivation-creative-workspace.webp",
      imageAlt: "Grow Godz cultivation and creative workspace prepared for a build log reel",
      growerHandle: "@grow.godz",
      ownerLabel: "Grow Godz Build Log",
      strain: "Not shown",
      stage: "Cultivation workspace",
      caption: "Behind-the-scenes documentation connecting cultivation notes, visual storytelling, and the Grow Godz build.",
      externalLink: "https://instagram.com/grow.godz",
      externalLabel: "Follow the build"
    },
    {
      id: "grow-godz-beginner-progress",
      category: "beginner-progress",
      categoryLabel: "Beginner Progress",
      image: "assets/images/webp/cultivation/grow-godz-cannabis-flower-hero-subtle-logo.webp",
      imageAlt: "Cannabis flower detail representing documented Grow Godz cultivation progress",
      growerHandle: "@grow.godz",
      ownerLabel: "Grow Godz Build Log",
      strain: "Mule Fuel",
      stage: "Progress documentation",
      caption: "A reminder that useful grow stories include the observations and lessons collected between milestones."
    },
    {
      id: "grow-godz-flower-detail",
      category: "grows",
      categoryLabel: "Grows",
      image: "assets/images/webp/cultivation/grow-godz-cannabis-flower-hero-large-logo.webp",
      imageAlt: "Grow Godz cannabis flower detail from an owned cultivation build log",
      growerHandle: "@grow.godz",
      ownerLabel: "Grow Godz Build Log",
      strain: "Not publicly listed",
      stage: "Flower detail",
      caption: "An owned Grow Godz cultivation image documenting flower detail and visual progress."
    }
  ];

  const gardenGrid = document.querySelector("#community-garden-grid");
  const filterButtons = Array.from(document.querySelectorAll(".garden-filter"));
  const gardenStatus = document.querySelector("#garden-results-status");

  const addDefinition = (list, label, value) => {
    const group = document.createElement("div");
    const term = document.createElement("dt");
    const description = document.createElement("dd");

    term.textContent = label;
    description.textContent = value;
    group.append(term, description);
    list.append(group);
  };

  const buildGardenCard = (entry) => {
    const card = document.createElement("article");
    card.className = "garden-card";
    card.dataset.category = entry.category;
    card.dataset.entryId = entry.id;

    const media = document.createElement("div");
    media.className = "garden-card-media";
    if (entry.category === "reels") {
      media.classList.add("reel-preview");
    }

    const image = document.createElement("img");
    image.src = entry.image;
    image.alt = entry.imageAlt;
    image.loading = "lazy";
    media.append(image);

    if (entry.category === "reels") {
      const playIcon = document.createElement("span");
      playIcon.className = "play-icon";
      playIcon.setAttribute("aria-hidden", "true");
      media.append(playIcon);
    }

    if (entry.status) {
      const status = document.createElement("span");
      status.className = "garden-card-status";
      status.textContent = entry.status;
      media.append(status);
    }

    const body = document.createElement("div");
    body.className = "garden-card-body";

    const meta = document.createElement("div");
    meta.className = "garden-card-meta";

    const category = document.createElement("span");
    category.textContent = entry.categoryLabel;

    const owner = document.createElement("span");
    owner.textContent = entry.ownerLabel;
    meta.append(category, owner);

    const handle = document.createElement("h3");
    handle.textContent = entry.growerHandle;

    const details = document.createElement("dl");
    addDefinition(details, "Strain", entry.strain);
    addDefinition(details, "Stage / Setup", entry.stage);

    const caption = document.createElement("p");
    caption.textContent = entry.caption;

    body.append(meta, handle, details, caption);

    if (entry.externalLink) {
      const link = document.createElement("a");
      link.className = "garden-card-link";
      link.href = entry.externalLink;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = `${entry.externalLabel || "View profile"} →`;
      body.append(link);
    }

    card.append(media, body);
    return card;
  };

  const renderGarden = (filter = "all") => {
    if (!gardenGrid) {
      return;
    }

    const entries = filter === "all"
      ? communityEntries
      : communityEntries.filter((entry) => entry.category === filter);

    gardenGrid.replaceChildren(...entries.map(buildGardenCard));

    if (gardenStatus) {
      const activeButton = filterButtons.find((button) => button.dataset.filter === filter);
      const filterLabel = activeButton ? activeButton.textContent.trim() : "All";
      gardenStatus.textContent = `${entries.length} ${entries.length === 1 ? "entry" : "entries"} shown for ${filterLabel}.`;
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((candidate) => {
        const isActive = candidate === button;
        candidate.classList.toggle("is-active", isActive);
        candidate.setAttribute("aria-pressed", String(isActive));
      });

      renderGarden(button.dataset.filter || "all");
    });
  });

  renderGarden();

  const submissionForm = document.querySelector("#community-submission-form");
  const submissionStatus = document.querySelector("#submission-form-status");

  if (submissionForm) {
    submissionForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const data = new FormData(submissionForm);
      const subject = `Grow Godz Community Submission — ${data.get("category")} — ${data.get("handle")}`;
      const message = [
        "Grow Godz Community Submission",
        "",
        `Name: ${data.get("name")}`,
        `Email: ${data.get("email")}`,
        `Instagram or Reddit handle: ${data.get("handle")}`,
        `Submission category: ${data.get("category")}`,
        `Strain: ${data.get("strain")}`,
        `Grow stage: ${data.get("stage")}`,
        "",
        "Short description:",
        String(data.get("description") || ""),
        "",
        "What others can learn:",
        String(data.get("lesson") || ""),
        "",
        `Image or video link: ${data.get("media")}`,
        "",
        `Permission to repost: ${data.get("permission")}`,
        `21+ confirmation: ${data.get("age")}`,
        `Local-law compliance: ${data.get("compliance")}`
      ].join("\n");

      if (submissionStatus) {
        submissionStatus.textContent = "Opening your email app. Review the prepared message and send it to complete your submission.";
      }

      window.location.href = `mailto:info@thegrowgodz.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    });
  }

  window.GrowGodzCommunityEntries = communityEntries;
})();
