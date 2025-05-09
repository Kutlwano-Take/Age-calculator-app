 document.addEventListener('DOMContentLoaded', function() {
            const dayInput = document.getElementById('day');
            const monthInput = document.getElementById('month');
            const yearInput = document.getElementById('year');

            const dayError = document.getElementById('day-error');
            const monthError = document.getElementById('month-error');
            const yearError = document.getElementById('year-error');

            const yearsResult = document.getElementById('years');
            const monthsResult = document.getElementById('months');
            const daysResult = document.getElementById('days');

            const currentYear = new Date().getFullYear();

            dayInput.addEventListener('input', validateAndCalculate);
            monthInput.addEventListener('input', validateAndCalculate);
            yearInput.addEventListener('input', validateAndCalculate);

            function validateAndCalculate() {
                resetErrors();

                const day = parseInt(dayInput.value);
                const month = parseInt(monthInput.value);
                const year = parseInt(yearInput.value);

                let isValid = true;

                if (isNaN(day) || day < 1 || day > 31) {
                    showError(dayInput, dayError, 'Must be a valid day');
                    isValid = false;
                }

                if (isNaN(month) || month < 1 || month > 12) {
                    showError(monthInput, monthError, 'Must be a valid month');
                    isValid = false;
                }

                if (isNaN(year) || year > currentYear || year < 1900) {
                    showError(yearInput, yearError, 'Must be between 1900 and current year');
                    isValid = false;
                }

                if (isValid) {
                    const date = new Date(year, month - 1, day);
                    if (
                        date.getFullYear() !== year ||
                        date.getMonth() + 1 !== month ||
                        date.getDate() !== day
                    ) {
                        showError(dayInput, dayError, 'The date is invalid, try another date');
                        isValid = false;
                    }
                }

                if (!isValid) {
                    resetResults();
                    return;
                }

                calculateAge();
            }

            function calculateAge() {
                const day = parseInt(dayInput.value);
                const month = parseInt(monthInput.value);
                const year = parseInt(yearInput.value);

                const birthDate = new Date(year, month - 1, day);
                const today = new Date();

                let years = today.getFullYear() - birthDate.getFullYear();
                let months = today.getMonth() - birthDate.getMonth();
                let days = today.getDate() - birthDate.getDate();

                if (days < 0) {
                    months--;
                    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
                    days += prevMonth.getDate();
                }

                if (months < 0) {
                    years--;
                    months += 12;
                }

                yearsResult.textContent = years;
                monthsResult.textContent = months;
                daysResult.textContent = days;
            }

            function showError(inputElement, errorElement, message) {
                inputElement.parentElement.classList.add('error-input');
                errorElement.textContent = message;
                errorElement.style.display = 'block';
            }

            function resetErrors() {
                document.querySelectorAll('.input-group').forEach(group => {
                    group.classList.remove('error-input');
                });

                document.querySelectorAll('.error').forEach(error => {
                    error.style.display = 'none';
                });
            }

            function resetResults() {
                yearsResult.textContent = '--';
                monthsResult.textContent = '--';
                daysResult.textContent = '--';
            }
        });