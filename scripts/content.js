const solved_label_id = 'captcha-result'

try {
    const parent = document.querySelector('body')
    let observer = new MutationObserver(async (mutations) => {
        const solved = document.getElementById(solved_label_id)
        if(solved) return

        for (let mutation of mutations) {
            if (Array.from(mutation.target.childNodes).some(child => child.nodeName === 'svg' || child.nodeName === 'SVG')) {
                const input = document.getElementsByClassName('q-dialog-plugin q-pa-sm rounded-1 text-secondary justify-center q-card')[0].getElementsByTagName('input')[0]
                input.placeholder = 'Captcha çözülüyor..'

                const svg = mutation.target.getElementsByTagName('svg')[0]
                const response = await fetch('https://captcha-resolver-o28t.onrender.com/svg', {
                    body: JSON.stringify({svg:svg.outerHTML}),
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                })
                const result = await response.json()
                const resultText = result.data.join().replaceAll(',','')
                const span = document.createElement('span')
                const text = document.createTextNode(resultText)
                span.appendChild(text)
                span.id = solved_label_id
                mutation.target.appendChild(span)
            }

        }
    });
    observer.observe(parent, {
        childList: true,
        subtree: true
    });
}
catch (err) {
    console.log(err)
}







