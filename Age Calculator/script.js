// Initialize max date
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('birthDate').max = today;
    
    let useCurrentDate = false; 
    // Tick ​​mark toggle function
    function toggleCurrentDate() {
        useCurrentDate = !useCurrentDate;
        const checkbox = document.getElementById('dateCheckbox');
        const targetDateInput = document.getElementById('targetDate');
        
        checkbox.classList.toggle('checked');
        
        if(useCurrentDate) {
            // Automatically set today's date if ticked
            targetDateInput.value = new Date().toISOString().split('T')[0];
            targetDateInput.disabled = true; 
        } else {
            // Unlock for manual input if not ticked.
            targetDateInput.disabled = false;
            targetDateInput.value = ''; 
        }
    }

    // Age Calculator Function
    function calculateAge() {
        const birthDate = new Date(document.getElementById('birthDate').value);
        const targetDate = useCurrentDate ? new Date() : new Date(document.getElementById('targetDate').value);
        
        const errorElement = document.getElementById('error');
        const resultElement = document.getElementById('result');

        // Reset states
        errorElement.style.display = 'none';
        resultElement.style.display = 'none';

        // Validation
        if(!birthDate.valueOf()) {
            showError('Please select birth date');
            return;
        }

        if(!useCurrentDate && !document.getElementById('targetDate').value) {
            showError('Please select target date');
            return;
        }

        if(birthDate > targetDate) {
            showError('Birth date cannot be after target date');
            return;
        }

        // Calculate ages
        const targetAge = calculateDifference(birthDate, targetDate);
        const currentAge = calculateDifference(birthDate, new Date());

        // Format results
        const targetDateFormatted = targetDate.toLocaleDateString('en-US', {
            weekday: 'long', 
            month: 'long',   
            day: 'numeric',  
            year: 'numeric'  
        });
        
        resultElement.innerHTML = `
        <div style="background-color: #eef7f2; padding: 15px; border-radius: 10px;">
            <h3 style="color: #025d8c; font-weight: bold;">Result:</h3>
            <div style="background-color: white; padding: 10px; border-radius: 8px; margin-top: 10px; text-align: center;">
                <p style="font-size: 16px; font-weight: bold;">Your Age is :</p>
                <p style="font-size: 20px; font-weight: bold; color: #027d3f;">
                    ${targetAge.years} Years ${targetAge.months} Months ${targetAge.days} Days
                </p>
            </div>
            <div style="background-color: white; padding: 10px; border-radius: 8px; margin-top: 10px; text-align: center;">
                <p style="font-size: 16px; font-weight: bold;">Your Age on Date is :</p>
                <p style="font-size: 20px; font-weight: bold; color: #027d3f;">
                ${targetDateFormatted}</p>
            </div>
        </div>
        `;
        
        resultElement.style.display = 'block';
    }

    // Age difference calculation function
    function calculateDifference(startDate, endDate) {
        let years = endDate.getFullYear() - startDate.getFullYear();
        let months = endDate.getMonth() - startDate.getMonth();
        let days = endDate.getDate() - startDate.getDate();

        if(days < 0) {
            const lastMonth = new Date(endDate.getFullYear(), endDate.getMonth() - 1, startDate.getDate());
            days = Math.floor((endDate - lastMonth) / (1000 * 60 * 60 * 24));
            months--;
        }

        if(months < 0) {
            months += 12;
            years--;
        }

        return { years, months, days };
    }

    // Function to show error messages
    function showError(message) {
        const errorElement = document.getElementById('error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    // Initial setup
    document.getElementById('dateCheckbox').classList.remove('checked'); 
    document.getElementById('targetDate').disabled = false; 
    document.getElementById('targetDate').value = ''; 
