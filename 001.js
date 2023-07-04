
const API = 'http://sample.bmaster.kro.kr/contacts'

function getPageno(){
    const params = new URLSearchParams(location.search);
    return params.get('pageno')===null? 1 : params.get('pageno');
}
async function fetch(pageno, pagesize=10){
    try{
    const url = `${API}?pageno=${pageno}&pagesize=${pagesize}`;
    return await $.ajax(url);
    } catch(err){
        console.log(err);
        return null;            // 에러가 발생하면 null 값을 가져오라는 의미이다
    }
}
function printContacts(contacts){
    const $tbody = $('#tbody');  //tbody안에 내용들을 넣을 수있는  방을 만든셈이다
    for(const c of contacts){   // contacts안에 있는 데이터들을 하나씩 차례대로 받아와서 const c 안에 넣는다 (contacts안에는 no,name,address,tel 의 내용들이 담겨있다)
        const html = `
            <tr>
                <td>${c.no}</td>
                <td>${c.name}</td>
                <td>${c.address}</td>
                <td>${c.tel}</td>
            </tr>
        `;
        $tbody.append(html);    //tbody 안에 화면에서 볼수있도록 html에 담겨있는 데이터들을 추가 해주었다
    }
}
function getPagination({pageno ,pagesize, totalcount, blockSize=5}){
 
    const countOfpage = Math.ceil(totalcount/pagesize);
    const prev= Math.floor((pageno-1)/blockSize) * blockSize;
        const start = prev + 1;
        let end = prev + blockSize;
        let next = end+1; 
        if(end>=countOfpage){
            end=countOfpage;
            next = 0;
        }
        return{prev ,start,  end,  next, pageno};  
}

// 구조분해할당
function printPagination({prev ,start,  end,  next, pageno}){
    const $p = $('#pagination')
    if(prev>0){
        const html =`
            <li class="page-item">
                <a class="page-ltem" href="list.html?pageno=${prev}">이전으로</a>
            </li>    
        `;
        $p.append(html);
    }
    for(let i=start; i<=end; i++){
        let className = 'page-item';
        if(i===pageno)
            className = 'page-item active';
        const html=`
            <li class="${className}">
                <a class="page-link" href="list.html?pageno=${i}">${i}</a>s
            </li>    
        `;
        $p.append(html);
    }
    if(next>0){
        const html =`
        <li class="page-item">
            <a class="page-link" href="list.html?pageno=${next}">다음으로</a>
        </li>    
    `;
    $p.append(html);
    }
}