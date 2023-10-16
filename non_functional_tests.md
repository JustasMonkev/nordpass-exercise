## First Challenge: Non-Functional Tests

---

### High Traffic Simulation

- **Objective**:
    - Test how the NordPass plans and checkout pages behave under high user load, especially during big sales or
      promotions.

- **Approach**:
    - Simulate `X` number of users navigating from the plans page to the checkout page within a short time period.

---

### Accessibility Testing

- **Tool**:
    - For this testing, I am using Chrome's official Screen Reader extension. You can find
      it [here](https://chrome.google.com/webstore/detail/screen-reader/kgejglhpjiefppelpmljglcjbhoiplfn)
    - If trying to load the webpage with the extension enabled, it crashes the browser.

#### Aria-label Attributes

- **Objective**:
    - Ensure that all critical interactive elements have `aria-label` attributes for accessibility.

- **Approach**:
    - Write automated tests to scan for the presence of `aria-label` attributes in interactive elements.

#### Axe-core Analysis

- **Objective**:
    - Check for any accessibility issues in the rendered web pages.

- **Approach**:
    - Integrate `axe-core` with automated tests to check each page for accessibility issues.

---
