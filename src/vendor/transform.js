class transform {
    fillDiv = () => {
        let div = document.getElementById('fit-wrap');

        let currentWidth = div.offsetWidth + 20;
        let currentHeight = div.offsetHeight + 230;

        let availableHeight = window.innerHeight;
        let availableWidth = window.innerWidth;

        let scaleX = availableWidth / currentWidth;
        let scaleY = availableHeight / currentHeight;

        let scale = Math.min(scaleX, scaleY);

        let translationX = Math.round((availableWidth - ((currentWidth - 20) * scale)) / 2);
        let translationY = Math.round((availableHeight - ((currentHeight - 100) * scale)));

        div.style.position = 'fixed';
        div.style.left = '0px';
        div.style.top = '0px';
        div.style.transform = 'translate(' + translationX + 'px, '+ translationY + 'px) scale3d('+ scale + ', ' + scale + ', 1)';
        div.style.webkitTransformOrigin = '0 0';
    }
}

export default new transform;