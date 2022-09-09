// Install cloudofficeprint using npm install cloudofficeprint 
import * as cop from 'cloudofficeprint';
import * as fs from "fs";

// Main object that holds the data
const collection = new cop.elements.ElementCollection();

//-------------style Property-----------//
//color
const style = new cop.elements.CellStyleDocx(
    '#eb4034',
    10,
);
const styleProperty = new cop.elements.CellStyleProperty(
    'testProperty',
    'some value',
    style,
);
collection.add(styleProperty);


//--------------autoLink--------------//
const autoLink = new cop.elements.AutoLink(
    'autoLink',
    'AutoLink including hyperlinks like https://www.cloudofficeprint.com and other mail like info@cloudofficeprint.com and text combined',
);
collection.add(autoLink)



//------------HyperLink------------//
const hyperlink = new cop.elements.Hyperlink(
    'linkToCOP',
    'https://www.cloudofficeprint.com'
)
collection.add(hyperlink);

//--------------styled Property--------------//


const styledProp = new cop.elements.StyledProperty(
    'cust_first_name',
    'DemoCustomerName',
    'NanumMyeongjo',
    '25pt',
    '#ff00ff'
);
collection.add(styledProp);

//------------------WaterMark--------------//
const watermark = new cop.elements.Watermark(
    'wm_name',
    'test Watemark',
)
collection.add(watermark);


//--------------tbox-----------------------//

//{tbox textBox} is only supported in excel for now.

//----------------------d3 chart-------//
//sample json_encoded_data
let d3_json_encoded_code = `  \n    // set the dimensions and margins of the graph  \n    const width = 1800;  \n    const height = 900;  \n    const margin = 10;  \n    const radius = Math.min(width, height) / 2 - margin;  \n\n    const d3 = require(\"d3\");  \n    const D3Node = require(\"d3-node\");  \n    const d3n = new D3Node();  \n    const svg = d3n.createSVG(width, height)  \n        .append(\"g\")  \n        .attr(\"transform\", \"translate(\" + width / 2 + \",\" + height / 2 + \")\");  \n    \n    let data_transformed = {};  \n    data.forEach(d => {data_transformed[d.x] = {\"y\": d.y, \"v\": d.z}});  \n    \n    // set the color scale  \n    var color = d3.scaleOrdinal()  \n        .domain(Object.keys(data_transformed))  \n        .range([\"#427d93\", \"#4c835b\", \"#89733e\", \"#ca4d3b\", \"#846a91\", \"#4f7d7b\", \"#aa643b\", \"#a26472\", \"#587a86\", \"#5e7d4f\", \"#c04f4f\"]);  \n\n    // Compute the position of each group on the pie:  \n    var pie = d3.pie()  \n        .sort(null) // Do not sort group by size  \n        .value(function(d) {return d.value.y; })  \n        .startAngle(-Math.PI/8)  \n        .endAngle(15 * Math.PI / 8)  \n        ;  \n    \n    var data_ready = pie(d3.entries(data_transformed));  \n    // The arc generator  \n    var arc = d3.arc()  \n        .innerRadius(radius * 0.35)         // This is the size of the donut hole  \n        .outerRadius(radius * 0.8)  \n        ;  \n    // Another arc that wont be drawn. Just for labels positioning  \n    var outerArc = d3.arc()  \n        .innerRadius(radius * 0.9)  \n        .outerRadius(radius * 0.9)  \n        ;  \n    // Another arc that wont be drawn. Just for labels positioning  \n    var outerArc2 = d3.arc()  \n        .innerRadius(radius * 0.8)  \n        .outerRadius(radius * 0.8)  \n        ;  \n    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.  \n    svg.selectAll(\"allSlices\")  \n        .data(data_ready)  \n        .enter()\n        .append(\"path\")  \n        .attr(\"d\", arc)  \n        .attr(\"fill\", function(d){ return(color(d.data.key)) })  \n        .attr(\"stroke\", \"white\")  \n        .style(\"stroke-width\", \"2px\") \n        //.style(\"opacity\", 0.7)  \n        ;  \n    \n    // Add the polylines between chart and labels:  \n    svg.selectAll(\"allPolylines\")  \n        .data(data_ready)  \n        .enter()  \n        .append(\"polyline\")  \n            .attr(\"stroke\", \"#888\")  \n            .style(\"fill\", \"none\")  \n            .attr(\"stroke-width\", 1)  \n            .attr(\"points\", function(d) {  \n                if(d.endAngle - d.startAngle<4*Math.PI/180){return []}\n            var posA = outerArc2.centroid(d) // line insertion in the slice  \n            var posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that  \n            var posC = outerArc.centroid(d); // Label position = almost the same as posB  \n            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left  \n            posC[0] = radius * 0.95 * (midangle % (2 * Math.PI) < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left  \n            return [posA, posB, posC]  \n            });  \n    \n    // Add labels:  \n    svg.selectAll(\"allLabels\")  \n        .data(data_ready)  \n        .enter()  \n        .append(\"text\")  \n            .attr(\"font-family\", \"Oracle Sans\")  \n            .attr(\"font-size\", \"24px\")  \n            .text( function(d) { \n                if(d.endAngle - d.startAngle<4*Math.PI/180){return \"\"}\n                return d.data.key } )  \n            .attr(\"transform\", function(d) {  \n                var pos = outerArc.centroid(d);  \n                var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2  \n                pos[0] = radius * 0.99 * (midangle % (2 * Math.PI) < Math.PI ? 1 : -1);  \n                return \"translate(\" + pos + \")\";  \n            })  \n            .style(\"text-anchor\", function(d) {  \n                var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2  \n                return (midangle % (2 * Math.PI) < Math.PI ? \"start\" : \"end\")  \n            });  \n\n    // Add values:  \n    svg.selectAll(\"allValues\")  \n        .data(data_ready)  \n        .enter()  \n        .append(\"text\")  \n            .attr(\"font-family\", \"Oracle Sans\")  \n            .attr(\"font-size\", \"24px\")  \n            .attr(\"fill\", \"#fff\")\n            .text( function(d) { \n                if(d.endAngle - d.startAngle<8*Math.PI/180){return \"\"}\n                return d.data.value.v } )  \n            .attr(\"transform\", function(d) {  \n                var pos = arc.centroid(d);  \n                pos[0] -= 6 * d.data.value.v.length;\n                pos[1] += 12\n                return \"translate(\" + pos + \")\";  \n            })\n            ;\n    return d3n;  \n    fail(new Error(\"We are missing something!\"));\n        `;
let data = [
    {
      "x": "CPQ Commerce",
      "y": 2036277,
      "z": "$2.04M"
    },
    {
      "x": "Fusion ERPM",
      "y": 1088007,
      "z": "$1.09M"
    },
    {
      "x": "SaaS - Health Science Applications",
      "y": 22537,
      "z": "$22.5K"
    }
  ]
const d3 = new cop.elements.D3Code(
    'd3_code',//name
    d3_json_encoded_code,//json encoded code
    data,//data
);
collection.add(d3);

//-----------------Insert Document------------//
const base64EncodedDoc = "UEsDBBQABgAIAAAAIQDfpNJsWgEAACAFAAATAAgCW0NvbnRlbnRfVHlwZXNdLnhtbCCiBAIooAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC0lMtuwjAQRfeV+g+Rt1Vi6KKqKgKLPpYtUukHGHsCVv2Sx7z+vhMCUVUBkQpsIiUz994zVsaD0dqabAkRtXcl6xc9loGTXmk3K9nX5C1/ZBkm4ZQw3kHJNoBsNLy9GUw2ATAjtcOSzVMKT5yjnIMVWPgAjiqVj1Ykeo0zHoT8FjPg973eA5feJXApT7UHGw5eoBILk7LXNX1uSCIYZNlz01hnlUyEYLQUiep86dSflHyXUJBy24NzHfCOGhg/mFBXjgfsdB90NFEryMYipndhqYuvfFRcebmwpCxO2xzg9FWlJbT62i1ELwGRztyaoq1Yod2e/ygHpo0BvDxF49sdDymR4BoAO+dOhBVMP69G8cu8E6Si3ImYGrg8RmvdCZFoA6F59s/m2NqciqTOcfQBaaPjP8ber2ytzmngADHp039dm0jWZ88H9W2gQB3I5tv7bfgDAAD//wMAUEsDBBQABgAIAAAAIQAekRq37wAAAE4CAAALAAgCX3JlbHMvLnJlbHMgogQCKKAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArJLBasMwDEDvg/2D0b1R2sEYo04vY9DbGNkHCFtJTBPb2GrX/v082NgCXelhR8vS05PQenOcRnXglF3wGpZVDYq9Cdb5XsNb+7x4AJWFvKUxeNZw4gyb5vZm/cojSSnKg4tZFYrPGgaR+IiYzcAT5SpE9uWnC2kiKc/UYySzo55xVdf3mH4zoJkx1dZqSFt7B6o9Rb6GHbrOGX4KZj+xlzMtkI/C3rJdxFTqk7gyjWop9SwabDAvJZyRYqwKGvC80ep6o7+nxYmFLAmhCYkv+3xmXBJa/ueK5hk/Nu8hWbRf4W8bnF1B8wEAAP//AwBQSwMEFAAGAAgAAAAhAN4ZrpW7AgAAqQoAABEAAAB3b3JkL2RvY3VtZW50LnhtbKSWyW7bMBBA7wX6D4TuMS15iSvEziFBgxyKBmj6ATRFS0S4gaQtu1/foRbLrdpAVgCD4jaPM8OZMe/uj1KgA7OOa7WO4sk0QkxRnXGVr6Ofr19vVhFynqiMCK3YOjoxF91vPn+6K9NM071kyiNAKJeWhq6jwnuTYuxowSRxE8mp1U7v/IRqifVuxynDpbYZTqbxtOoZqylzDs57IOpAXNTg6HEYLbOkBOEAnGNaEOvZsWPEV0MW+Ate9UHJCBBYmMR91Oxq1BIHrXqg+SgQaNUjLcaR/mHcchwp6ZNux5FmfdJqHKkXTrIf4NowBYs7bSXxMLQ5lsS+7c0NgA3xfMsF9ydgTpcthnD1NkIjkDoT5Cy7mnCLpc6YmGUtRa+jvVVpI39zlg+qp7V882kl7BD7a5HHpjhUlmPLBPhCK1dwc85wOZYGi0ULObxnxEGKdl9p4oHp8r/y9Fi7sgMOUb/xvxS15u8T4+mAGwmIs8QQFf48s9VEQhR2B49yzYVz44EFpAUkPcCSsoEFv2WsGgamXYYGDh+YGi2nvpXA4Z1j44F17G9lLgAu81lxFSVp/YqDLPGkIO4c6IHIrlNqccad5IWPTP6xRHiyem86Gv8Y7bkra2V4YFzBahLqMsndx5T5URAD1U7S9DlX2pKtAI0gPRBEOKpuILQQKOFTddmxmg93jUKNiTbwMtrq7BS+JjQ2NH7zWnCH4EeQI9IIhuD5hHxBPCq5EGjLEFeOwd9NBh308P0FeeY8osQxN7nDARFaW7UV2DHqXyq6yX/8QmUoB3GSzOEJV6YQefFiBX1cb/hGLMx6DVUrntdbLM8L3w232nstu7Fgu4vVgpGMQf2/TarhTmt/Mcz3vho2x1EtHMw6Qyir91TTYPGTDb5LBVfshXsKWs6W1Sru7MGtA3H3xtz8BgAA//8DAFBLAwQUAAYACAAAACEA1mSzUfQAAAAxAwAAHAAIAXdvcmQvX3JlbHMvZG9jdW1lbnQueG1sLnJlbHMgogQBKKAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACskstqwzAQRfeF/oOYfS07fVBC5GxKIdvW/QBFHj+oLAnN9OG/r0hJ69BguvByrphzz4A228/BineM1HunoMhyEOiMr3vXKnipHq/uQRBrV2vrHSoYkWBbXl5sntBqTkvU9YFEojhS0DGHtZRkOhw0ZT6gSy+Nj4PmNMZWBm1edYtyled3Mk4ZUJ4wxa5WEHf1NYhqDPgftm+a3uCDN28DOj5TIT9w/4zM6ThKWB1bZAWTMEtEkOdFVkuK0B+LYzKnUCyqwKPFqcBhnqu/XbKe0y7+th/G77CYc7hZ0qHxjiu9txOPn+goIU8+evkFAAD//wMAUEsDBBQABgAIAAAAIQBmOrwUJAYAAI8aAAAVAAAAd29yZC90aGVtZS90aGVtZTEueG1s7FlNixs3GL4X+h+GuTse2zP+WOIN47GdtNlNQnaTkqM8I88o1oyMJO+uCYGSnHopFNLSQwO99VBKAw009NIfs5DQpj+iksZjj2y5S7oOhNI1rPXxvK8eva/0SOO5eu0sxdYJpAyRrGvXrji2BbOQRCiLu/a942GlbVuMgywCmGSwa88hs6/tf/zRVbDHE5hCS9hnbA907YTz6V61ykLRDNgVMoWZ6BsTmgIuqjSuRhScCr8prtYdp1lNAcpsKwOpcHt7PEYhtI6lS3u/cD7A4l/GmWwIMT2SrqFmobDRpCa/2JwFmFonAHdtMU5ETo/hGbctDBgXHV3bUX92df9qdWmE+Rbbkt1Q/S3sFgbRpK7saDxaGrqu5zb9pX8FwHwTN2gNmoPm0p8CgDAUM8256D5b9cBdYEugvGjw3W/1GzUNX/Lf2MD7nvxoeAXKi+4GfjgMVjEsgfKit4H3ep1eX/evQHmxuYFvOX7fbWl4BUowyiYbaMdrNoJitkvImOAbRnjHc4et+gK+QlVLqyu3z/i2tZaCh4QOBUAlF3CUWXw+hWMQClwAMBpRZB2gOBELbwoywkSzU3eGTkP8lx9XlVRGwR4EJeu8KWQbTZKPxUKKprxrfyq82iXI61evzp+8PH/y6/nTp+dPfl6MvWl3A2Rx2e7tD1/99fxz689fvn/77GsznpXxb3764s1vv/+Te67R+ubFm5cvXn/75R8/PjPAfQpGZfgxSiGzbsFT6y5JxQQNA8ARfTeL4wSgsoWfxQxkQNoY0AOeaOhbc4CBAdeDehzvUyEXJuD12UON8FFCZxwZgDeTVAMeEoJ7hBrndFOOVY7CLIvNg9NZGXcXgBPT2MFalgezqVj3yOQySKBG8w4WKQcxzCC3ZB+ZQGgwe4CQFtdDFFLCyJhbD5DVA8gYkmM00lbTyugGSkVe5iaCIt9abA7vWz2CTe778ERHir0BsMklxFoYr4MZB6mRMUhxGXkAeGIieTSnoRZwxkWmY4iJNYggYyab23Su0b0pZMac9kM8T3Uk5WhiQh4AQsrIPpkECUinRs4oS8rYT9hELFFg3SHcSILoO0TWRR5AtjXd9xHU0n3x3r4nZMi8QGTPjJq2BCT6fpzjMYDKeXVN11OUXSjya/LuvT95FyL6+rvnZs3dgaSbgZcRc58i425al/BtuHXhDgiN0Iev230wy+5AsVUM0P9l+3/Z/s/L9rb9vHuxXumzusgX13XlJt16dx8jjI/4HMMDppSdielFQ9GoKspo+agwTURxMZyGiylQZYsS/hniyVECpmKYmhohZgvXMbOmhImzQTUbfcsOPEsPSZS31mrF06kwAHzVLs6Wol2cRDxvbbZWj2FL96oWq8flgoC0fRcSpcF0Eg0DiVbReAEJNbOdsOgYWLSl+60s1NciK2L/WUD+sOG5OSOx3gCGkcxTbl9kd+eZ3hZMfdp1w/Q6kutuMq2RKC03nURpGSYgguvNO851Z5VSjZ4MxSaNVvt95FqKyJo24EyvWadizzU84SYE0649FrdCUUynwh+TuglwnHXtkC8C/W+UZUoZ7wOW5DDVlc8/RRxSC6NUrPVyGnC24lart+QcP1ByHefDi5z6KicZjscw5FtaVlXRlzsx9l4SLCtkJkgfJdGpNcIzeheIQHmtmgxghBhfRjNCtLS4V1Fck6vFVtR+NVttUYCnCVicKGUxz+GqvKRTmodiuj4rvb6YzCiWSbr0qXuxkewoieaWA0Semmb9eH+HfInVSvc1Vrl0r2tdp9C6bafE5Q+EErXVYBo1ydhAbdWqU9vhhaA03HJpbjsjdn0arK9aeUAU90pV23g9QUYPxcrvi+vqDHOmqMIz8YwQFD8s50qgWgt1OePWjKKu/cjxfDeoe0HFaXuDittwnUrb8xsV3/MatYFXc/q9+mMRFJ6kNS8feyieZ/B88fZFtW+8gUmLa/aVkKRVou7BVWWs3sDU6tvfwFhIROZRsz7sNDq9ZqXT8IcVt99rVzpBs1fpN4NWf9gPvHZn+Ni2ThTY9RuB2xy0K81aEFTcpiPptzuVlluv+27Lbw9c//Ei1mLmxXcRXsVr/28AAAD//wMAUEsDBBQABgAIAAAAIQDf0l5E9AMAAE4LAAARAAAAd29yZC9zZXR0aW5ncy54bWy0Vt9v2zgMfj/g/ofAz5c6cZN0M5oOTdPcOjTbcOnunmWLiYXqFyQ5aTbc/36UbMXpehjaDX1JZH7kR4oiKZ2/exC8twVjmZLTZHgySHogS0WZ3EyTL3eL/pukZx2RlHAlYZrswSbvLn7/7XyXW3AO1WwPKaTNRTlNKud0nqa2rEAQe6I0SATXygji8NNsUkHMfa37pRKaOFYwztw+zQaDSdLSqGlSG5m3FH3BSqOsWjtvkqv1mpXQ/kUL8xy/jclclbUA6YLH1ADHGJS0FdM2somfZUOwiiTbH21iK3jU2w0Hz9juThl6sHhOeN5AG1WCtXhAgscAmewcj54QHXyfoO92i4EKzYeDsDqOfPwyguwJwaSEh5dxvGk5UrQ85mH0ZTyTAw/rEjuc/FwwRwSWOlq9iCWLeU29LXGkIvZQRZ4RXhbU+EC3F12OLH9O1TTQLSsMMU1PtiUjyvxmI5UhBcdwsHR6ePq9EJ3/xST6v7CEhyD3eUgucEZ8VUr0drkGU2Kj4IAZDJLUAwa2zM+cvxnsUIHJ+0splWv6cZq0WhTWpObujhQrpzTqbQlu5Sxr4bIihpQOzEqTEiv9SklnFI96VH1U7gonjcFGaC3C3OlWq2aGoYUkAjf3aC4tFcUhs8trw55/Ct4geB+Oj11+70jhzDWMwp1P6srtOSww+BX7CpeSfqitY8gYsvELEfwoAJDe8ycsg7u9hgUQV2OaXslZOIkFZ3rJjFHmRlKshldzxtZrMOiAEQdLLB9m1C7k+T0QilfdK/mtLfyDytiFp3dYlvcz5ZwS7/e6wlz/2kmGek+78hW5v20+m7jytdMTje4VEYVhpLf091HqNQpzP2My4gVg08MxsqqLCPb7DWAF4XyBu4hAiEDklFk9h3VY8yUxm4631TD/K8VG/nDg8qMAzJ9G1bpBd4bopiaiynA0ai2ZdLdMRLmti1W0kjimjqBa0k9bExLVpWeXO8xx6K1bEs4q6ILsf1n57BaM4nlI6H/83B4tNyt/LLAkWjenW2yG04SzTeWG3sThF8VXTPgoNlmLZQHLGix8kNJvFLXbRSfLouxI7zTKTjvZKMpGnWwcZeNONomyiZdV2M+G40TFQotLL18rztUO6PsOfyJqkmAromHezF57ca4aQTuMbW+bwwPOcqDM4eNQMyrIgx/t2cSbt9qc7FXtHul6zCvrxwz+2mtbK31kHEr+u1j8nVAyrM7VXhTdqD9pAufMYltqvBWcMhH7I2DDcbguXGhNPNi/YD0jFmiLUVXe+Gts3Nh8my8mZ4ury7f9xfXsrD8avR30Z5NTfA7Pz67n2WKcXV3P/m27Mj6EL/4DAAD//wMAUEsDBBQABgAIAAAAIQBoxnipfQsAAPtyAAAPAAAAd29yZC9zdHlsZXMueG1svJ1bc9u6EcffO9PvwNFT+5DIVznJHOdM7MS1p3aOT+Q0zxAJWahBQuXFl376AiAlQV6C4oJbvyTWZX8A8cd/ieVNv/3+nMrokeeFUNnpaP/93ijiWawSkd2fjn7eXbz7MIqKkmUJkyrjp6MXXox+//zXv/z29KkoXyQvIg3Iik9pfDpalOXy03hcxAuesuK9WvJMfzhXecpK/TK/H6csf6iW72KVLlkpZkKK8mV8sLc3GTWYvA9Fzeci5l9VXKU8K238OOdSE1VWLMSyWNGe+tCeVJ4scxXzotAbncqalzKRrTH7RwCUijhXhZqX7/XGND2yKB2+v2f/SuUGcIwDHADAJObPOMaHhjHWkS5HJDjOZM0RicMJ64wDKJIyWaAoB6txHZtYVrIFKxYukeM6dbzGvaRmjNL409V9pnI2k5qkVY+0cJEFm3/19pv/7J/82b5vNmH0WXshUfFXPmeVLAvzMr/Nm5fNK/vfhcrKInr6xIpYiDvdQd1KKnSDl1+yQoz0J5wV5ZdCsNYPF+aP1k/ionTePhOJGI1Ni8V/9YePTJ6ODg7qdyTL7lfv8ezdz6nbqvPWTDNORxl/9/3WBI6bjaj/dzZt+fqVbXbJYmHbYfOSa0vvT/YMVAqTQQ6OP65e/KjMQLOqVE0jFlD/v8aOwehqp2vfT+v0oz/l82sVP/BkWuoPTke2Lf3mz6vbXKhcp5jT0Ufbpn5zylNxKZKEZ84Xs4VI+K8Fz34WPNm8/+eFTRPNG7GqMv334cnEKi6L5NtzzJcm6ehPM2bG/7sJkObbldg0bsP/s4LtN0q0xS84M5k32n+NsN1HIQ5MROFsbTuzerXt9luohg7fqqGjt2ro+K0amrxVQydv1dCHt2rIYv6fDYks0Unefh82A6i7OB43ojkes6E5Hi+hOR6roDkeJ6A5nomO5njmMZrjmaYITqli3yx0JvuhZ7Z3c3fvI8K4u3cJYdzde4Aw7u6EH8bdnd/DuLvTeRh3d/YO4+5O1nhuvdSKrrTNsnKwy+ZKlZkqeVTy5+E0lmmWLUdpeGanx3OSjSTA1Jmt2REPpsXMvt49Q6xJw/fnpanqIjWP5uK+ynkxuOM8e+RSLXnEkkTzCIE5L6vcMyIhczrnc57zLOaUE5sOairBKKvSGcHcXLJ7MhbPEuLhWxFJksJ6Quv6eWFMIggmdcriXA3vmmJk+eFaFMPHykCis0pKTsT6TjPFLGt4bWAxw0sDixleGVjM8MLA0YxqiBoa0Ug1NKIBa2hE41bPT6pxa2hE49bQiMatoQ0ftztRSpvi3VXHfv9jd+dSmRMIg/sxFfcZ0wuA4bub5phpdMtydp+z5SIyR6Dbse42Y9s5U8lLdEexT1uTqNb1doqc660WWTV8QLdoVOZa84jsteYRGWzNG26xG71MNgu0S5p6ZlrNylbTWlIv006ZrOoF7XC3sXL4DNsY4ELkBZkN2rEEM/i7Wc4aOSky36aXwzu2YQ231eusRNq9BknQS6niB5o0fPmy5Lkuyx4Gky6UlOqJJ3TEaZmreq65lj+wkvSy/Ld0uWCFsLXSFqL/rn516UF0w5aDN+hWMpHR6PbtXcqEjOhWEJd3N9fRnVqaMtMMDA3wTJWlSsmYzZHAv/3is7/TdPCLLoKzF6Kt/UJ0eMjCzgXBTqYmqYSIpJeZIhMk+1DL+yd/mSmWJzS025zXV/uUnIg4ZemyXnQQeEvnxSedfwhWQ5b3L5YLc1yIylR3JDDnsGFRzf7N4+Gp7ruKSI4M/VGV9vijXeraaDrc8GXCFm74EsGqqXcPZv4SbOwWbvjGbuGoNvZcsqIQ3lOowTyqzV3xqLd3ePHX8JRU+bySdAO4ApKN4ApINoRKVmlWUG6x5RFusOVRby/hlLE8gkNylvePXCRkYlgYlRIWRiWDhVFpYGGkAgy/QseBDb9Mx4ENv1anhhEtARwY1Twj3f0TneVxYFTzzMKo5pmFUc0zC6OaZ4dfIz6f60Uw3S7GQVLNOQdJt6PJSp4uVc7yFyLkN8nvGcEB0pp2m6u5uQ1EZfVF3ARIc4xaEi62axyVyL/4jKxrhkXZL4IjokxKpYiOrW12ODZy+9q1XWH2ro3BXbiVLOYLJROee7bJH6vr5Wl9W8br7ttu9DrseS3uF2U0XayP9ruYyd7OyFXBvhW2u8G2MZ+s7mdpC7vhiajSVUfhzRSTw/7BdkZvBR/tDt6sJLYij3tGwjYnuyM3q+StyJOekbDNDz0jrU+3Irv88JXlD60T4aRr/qxrPM/kO+maRevg1ma7JtI6sm0KnnTNoi2rRF/i2JwtgOr084w/vp95/PEYF/kpGDv5Kb195Ud0GewHfxRmz45Jmra99dUTIO/bRXSvzPlnperj9lsnnPrf1HWlF05ZwaNWzmH/E1dbWcY/jr3TjR/RO+/4Eb0TkB/RKxN5w1EpyU/pnZv8iN5Jyo9AZyu4R8BlKxiPy1YwPiRbQUpIthqwCvAjei8H/Ai0USECbdQBKwU/AmVUEB5kVEhBGxUi0EaFCLRR4QIMZ1QYjzMqjA8xKqSEGBVS0EaFCLRRIQJtVIhAGxUi0EYNXNt7w4OMCiloo0IE2qgQgTaqXS8OMCqMxxkVxocYFVJCjAopaKNCBNqoEIE2KkSgjQoRaKNCBMqoIDzIqJCCNipEoI0KEWij1rcahhsVxuOMCuNDjAopIUaFFLRRIQJtVIhAGxUi0EaFCLRRIQJlVBAeZFRIQRsVItBGhQi0Ue3JwgFGhfE4o8L4EKNCSohRIQVtVIhAGxUi0EaFCLRRIQJtVIhAGRWEBxkVUtBGhQi0USGia342pyh9l9nv4496eq/Y73/qqunUD/dWbhd12B+16pWf1f9ehDOlHqLWGw8Pbb3RDyJmUih7iNpzWt3l2ksiUCc+/zjvvsPHpQ986FJzL4Q9ZwrgR30jwTGVo64p70aCIu+oa6a7kWDVedSVfd1IsBs86kq61peri1L07ggEd6UZJ3jfE96VrZ1wOMRdOdoJhCPclZmdQDjAXfnYCTyOTHJ+HX3cc5wm6+tLAaFrOjqEEz+ha1pCrVbpGBqjr2h+Ql/1/IS+MvoJKD29GLywfhRaYT8qTGpoM6zU4Ub1E7BSQ0KQ1AATLjVEBUsNUWFSw8SIlRoSsFKHJ2c/IUhqgAmXGqKCpYaoMKnhrgwrNSRgpYYErNQDd8heTLjUEBUsNUSFSQ0Xd1ipIQErNSRgpYaEIKkBJlxqiAqWGqLCpAZVMlpqSMBKDQlYqSEhSGqACZcaooKlhqguqe1RlC2pUQo74bhFmBOI2yE7gbjk7AQGVEtOdGC15BACqyWo1UpzXLXkiuYn9FXPT+gro5+A0tOLwQvrR6EV9qPCpMZVS21ShxvVT8BKjauWvFLjqqVOqXHVUqfUuGrJLzWuWmqTGlcttUkdnpz9hCCpcdVSp9S4aqlTaly15JcaVy21SY2rltqkxlVLbVIP3CF7MeFS46qlTqlx1ZJfaly11CY1rlpqkxpXLbVJjauWvFLjqqVOqXHVUqfUuGrJLzWuWmqTGlcttUmNq5bapMZVS16pcdVSp9S4aqlTaly1dKNDBMEjoKYpy8uI7nlxl6xYlGz4wwl/ZjkvlHzkSUS7qdeorRw/bf38lWHb3+HT3y/1mJknoDu3KyX1E2AboP3iVbL+mSoTbHoSNT8I1rxtO9ycrq1btIGwqXih24qbZ1d5mmqeQbu+ico+gfZ1w54H1dqObCbg6tvNkG7Gq/7e1mh19rs0E76jz9YQnWNUe8bXwY9NEtjVQ92fmax/Mk3/cZUlGvDU/FxY3dPkmdUo/fk5l/KG1d9WS/9XJZ+X9af7e/aRBa8+n9VP3/PG5zZNewHj7c7UL5ufbfOMd/08/ub6Ae+UNLmoZbjtxSxDR3rTt9Vfxef/AQAA//8DAFBLAwQUAAYACAAAACEA7wopTk4BAAB+AwAAFAAAAHdvcmQvd2ViU2V0dGluZ3MueG1snNNfa8IwEADw98G+Q8m7psoUKVZhDMdexmDbB4jp1YYluZKLq+7T79qpc/hi95L/9+MuIfPlztnkEwIZ9LkYDVORgNdYGL/JxfvbajATCUXlC2XRQy72QGK5uL2ZN1kD61eIkU9SwoqnzOlcVDHWmZSkK3CKhliD580Sg1ORp2EjnQof23qg0dUqmrWxJu7lOE2n4sCEaxQsS6PhAfXWgY9dvAxgWURPlanpqDXXaA2Gog6ogYjrcfbHc8r4EzO6u4Cc0QEJyzjkYg4ZdRSHj9Ju5OwvMOkHjC+AqYZdP2N2MCRHnjum6OdMT44pzpz/JXMGUBGLqpcyPt6rbGNVVJWi6lyEfklNTtzetXfkdPa08RjU2rLEr57wwyUd3LZcf9t1Q9h1620JYsEfAutonPmCFYb7gA1BkO2yshabl+dHnsg/v2bxDQAA//8DAFBLAwQUAAYACAAAACEAWw7N8RkCAACDBwAAEgAAAHdvcmQvZm9udFRhYmxlLnhtbNyTTY/TMBCG70j8h8j3bZz0Y0u16UpAKyEBB7T8ANdxEgt/RB632f57xk7aLepW2nDgQA6O847nycxr++HxWavkIBxIawqSTShJhOG2lKYuyM+n7d2SJOCZKZmyRhTkKIA8rt+/e+hWlTUeEsw3sNK8II337SpNgTdCM5jYVhgMVtZp5vHT1alm7te+veNWt8zLnVTSH9Oc0gUZMO4tFFtVkovPlu+1MD7mp04oJFoDjWzhROveQuusK1tnuQDAnrXqeZpJc8ZksyuQltxZsJWfYDNDRRGF6RmNM61eAPNxgPwKsODieRxjOTBSzLzkyHIcZ3HmyPKC83fFXACg9GUzipKffE1DLvOsYdBcEsW4ouZn3FEHjzRffamNdWynkIS7nuDGJREcRuw/vOJUPEc9tEDWw1VIupVhGjM/MSV3TsZAy4wFkWHswFRBsIctndPQS05ndBpGkoaFvGEORID0C2kvV0xLdTyp0EmAPtBKz5uTfmBOhqr7EMgaA3vY0YJsZpTmm+2W9EqG1VFUZvcfByUP/4rPh0GZnhUaFB458TPrOTxyzmvwn2nvwJUT35ipmbphxAyNmEYzptGIfIQRzmpmRhkRSl1SOn0x4rLJP4w4KbeNQCvGGfEktYDku+iSH7Hy1x3J6SI6EpwJrow5GuMd2dDXjsb9cv5PjsZwSZKvsm78zasSz8X/eVWGCax/AwAA//8DAFBLAwQUAAYACAAAACEA1oe773IBAADxAgAAEQAIAWRvY1Byb3BzL2NvcmUueG1sIKIEASigAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjJJRT8IwFIXfTfwPS9+3diNBs4yRiOFFSYxiNL7V9gKVtWvawti/t9tgOOXBt3t7vnt2d9psepBFsAdjRakmKI4ICkCxkgu1nqDX5Ty8RYF1VHFalAomqAaLpvn1VcZ0ykoDT6bUYJwAG3gnZVOmJ2jjnE4xtmwDktrIE8qLq9JI6nxr1lhTtqVrwAkhYyzBUU4dxY1hqHtHdLTkrLfUO1O0BpxhKECCchbHUYzPrAMj7cWBVvlBSuFqDRfRk9jTByt6sKqqqBq1qN8/xu+Lx5f2V0OhmqwYoDzjLHXCFZBn+Fz6yu4+v4C57rhvfM0MUFea/JlKtvGBGxo8zFrqpDSZb6GuSsOtnx90HuNgmRHa+Zvs3AcHni6odQt/tSsB/K7+/aG/QDNjYC+at5HHLdG32THobjnggQ8o7eI8KW+j2f1yjvKEJElIkjCOl+Q2JeOUkI9mv8H82VAeF/i/483Q8WTQRTR8pPk3AAAA//8DAFBLAwQUAAYACAAAACEAkDs7GXEBAADHAgAAEAAIAWRvY1Byb3BzL2FwcC54bWwgogQBKKAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACcUstOwzAQvCPxD1HurVMQFaCNK9QKceAlNdCzZW8SC8e2bIPo37MhbQjihk87s97RzNqw+uxM9oEhamfLfDEv8gytdErbpsxfqtvZZZ7FJKwSxlks8z3GfMVPT+A5OI8haYwZSdhY5m1K/pqxKFvsRJxT21KndqETiWBomKtrLXHj5HuHNrGzolgy/ExoFaqZHwXzQfH6I/1XVDnZ+4uv1d6THocKO29EQv7YT5q5cqkDNrJQuSRMpTvkC6JHAM+iwdhzQwE7F1TkV8CGAtatCEIm2h+/OAc2gXDjvdFSJFosf9AyuOjqlD19u836cWDTK0AJtijfg057XgCbQrjXdrAxFGQriCYI3x68jQi2UhhcU3ZeCxMR2A8Ba9d5YUmOjRXpvcUXX7lNv4bDyG9yknGnU7v1QpKF5WKadtKALbGoyP7oYCTgjp4jmF6eZm2D6njnb6Pf3+vwL/liOS/ofC/syFHs8cPwLwAAAP//AwBQSwECLQAUAAYACAAAACEA36TSbFoBAAAgBQAAEwAAAAAAAAAAAAAAAAAAAAAAW0NvbnRlbnRfVHlwZXNdLnhtbFBLAQItABQABgAIAAAAIQAekRq37wAAAE4CAAALAAAAAAAAAAAAAAAAAJMDAABfcmVscy8ucmVsc1BLAQItABQABgAIAAAAIQDeGa6VuwIAAKkKAAARAAAAAAAAAAAAAAAAALMGAAB3b3JkL2RvY3VtZW50LnhtbFBLAQItABQABgAIAAAAIQDWZLNR9AAAADEDAAAcAAAAAAAAAAAAAAAAAJ0JAAB3b3JkL19yZWxzL2RvY3VtZW50LnhtbC5yZWxzUEsBAi0AFAAGAAgAAAAhAGY6vBQkBgAAjxoAABUAAAAAAAAAAAAAAAAA0wsAAHdvcmQvdGhlbWUvdGhlbWUxLnhtbFBLAQItABQABgAIAAAAIQDf0l5E9AMAAE4LAAARAAAAAAAAAAAAAAAAACoSAAB3b3JkL3NldHRpbmdzLnhtbFBLAQItABQABgAIAAAAIQBoxnipfQsAAPtyAAAPAAAAAAAAAAAAAAAAAE0WAAB3b3JkL3N0eWxlcy54bWxQSwECLQAUAAYACAAAACEA7wopTk4BAAB+AwAAFAAAAAAAAAAAAAAAAAD3IQAAd29yZC93ZWJTZXR0aW5ncy54bWxQSwECLQAUAAYACAAAACEAWw7N8RkCAACDBwAAEgAAAAAAAAAAAAAAAAB3IwAAd29yZC9mb250VGFibGUueG1sUEsBAi0AFAAGAAgAAAAhANaHu+9yAQAA8QIAABEAAAAAAAAAAAAAAAAAwCUAAGRvY1Byb3BzL2NvcmUueG1sUEsBAi0AFAAGAAgAAAAhAJA7OxlxAQAAxwIAABAAAAAAAAAAAAAAAAAAaSgAAGRvY1Byb3BzL2FwcC54bWxQSwUGAAAAAAsACwDBAgAAECsAAAAA"

const insertDocument = new cop.elements.Insert('document_to_insert',base64EncodedDoc);
collection.add(insertDocument);

//----------------------------------------------//

// Add server
// If you are using onpremise-version do not need to specify YOUR_API_KEY else replace it with your api key.
const server = new cop.config.Server(
    "http://localhost:8010/",
    new cop.config.ServerConfig("YOUR_API_KEY"),
);

// Create printjob
const printjob = new cop.PrintJob(
    collection,
    server,
    cop.Resource.fromLocalFile('./data/docxElements_template.docx'),
);

fs.writeFileSync('./printjob.json',JSON.stringify(printjob.asDict()));

// Asynchronously execute print job and save response to file
(async () => {
    try{
        const response = await printjob.execute();
        await response.toFile('./output/output_docxElements');
    }catch(err){
        console.log(err);
    }
})()