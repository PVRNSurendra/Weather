let para = document.querySelector('p');
let btn = document.querySelector('button');
let dv = document.querySelector('#idd');

btn.addEventListener('click', function() {
    dv.style.display = 'block';  
    dv.innerHTML = ''; 
    let country = document.querySelector('input').value;
    let url = `http://api.weatherapi.com/v1/current.json?key=2b59af3046704081b82131508242409&q=${country}&aqi=no`;

    if (!country) {
        para.innerText = 'Please enter a country';
        return;
    }

    fetch(url).then((wthr) => {
        wthr.json().then((real) => {
            const weatherData = {
                'Location': real.location.name,
                'Region': real.location.region,
                'Country': real.location.country,
                'Temperature (Celsius)': `${real.current.temp_c}°C`,
                'Weather Condition': real.current.condition.text,
                'Last Updated': real.current.last_updated,
                'Wind Speed (mph)': real.current.wind_mph,
                'Humidity': real.current.humidity,
                'Cloud': real.current.cloud,
            };

            for (const [key, value] of Object.entries(weatherData)) {
                dv.innerHTML += `
                    <div style="display: flex; justify-content: space-between; margin: 5px 0;">
                        <strong style="flex: 0 0 150px;">${key}:</strong>
                        <span>${value}</span>
                    </div>`;
            }
        }).catch((err) => {
            dv.innerText = 'Data not found';
        });
    });
});
