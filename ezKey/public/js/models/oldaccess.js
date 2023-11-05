export default function createAndAppendAccessCodeElement(accessCode, parentElementSelector) {
    const currentDate = new Date();
    const expirationDate = new Date(accessCode.expirationDate);
    
    const isExpired = currentDate > expirationDate;
    const statusClass = isExpired ? 'inactive' : 'active';
    
    const day = expirationDate.getDate();
    const month = expirationDate.toLocaleString('en-US', { month: 'short' });
    const time = expirationDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    
    // Create a new div element for the access code
    const codeElement = document.createElement('div');
    codeElement.classList.add('createdcode', 'row', 'row-col-1');
    
    // Add the content to the code element
    codeElement.innerHTML = `
      <div class="sn col"></div>
      <div class="visitorsname col">${accessCode.visitorsName}</div>
      <div class="code col">${accessCode.accessCode}</div>
      <div class="status ${statusClass} col">${isExpired ? 'Expired' : 'Active'}</div>
      <div class="valid col">${day}, ${month}, ${time}</div>
      <hr>
    `;
    
    // Find the element to which you want to append the new code element
    const parentElement = document.querySelector(parentElementSelector);
    
    // Set the serial number (sn) within the code element
    const snElement = codeElement.querySelector('.sn');
    snElement.textContent = parentElement.childElementCount - 1;
    
    // Append the code element as the last child of the parent element
    parentElement.insertBefore(codeElement, parentElement.firstChild);
  }
  