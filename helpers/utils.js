const itemModal=require('../schemas/items')
const createFilterStatus=(currenStatus)=>{
   let statusFilter = [
      { name: 'ALL', value: 'all', count: 0, link: '#', class: 'default' },
      {
          name: 'ACTIVE',
          value: 'active',
          count: 0,
          link: '#',
          class: 'default'
      },
      {
          name: 'INACTIVE',
          value: 'inactive',
          count: 0,
          link: '#',
          class: 'default'
      }
  ];
   statusFilter.forEach((st, index) => {
      let condition = {};
      if (st.value != 'all') {
          condition = { status: st.name };
      }
      if(currenStatus===st.value){
        st.class="success"
      }
      itemModal
          .countDocuments(condition)
          .then((data) => {
              statusFilter[index].count = data;
             
          })
          .catch((err) => console.log(err));
  });
  return statusFilter;
}
module.exports=createFilterStatus