var sqlMap = {
    user: {
        // 添加用户
        add: 'insert into user(u_id, u_name, phone, idcard) values (?, ?, ?, ?)',
        // 查询用户
        select: 'select * from user where phone = ?',
    },

    product: {
        //查询该账户产品
        selectU: 'select * from product where up_id = ?',
        //查询指定产品
        selectP: 'select * from product where p_id = ?',
        //添加产品
        add: 'insert into product(p_id, p_name, origin, infotime, storage, transport, up_id) values (?, ?, ?, ?, ?, ?, ?)',
        //修改产品
        update: 'update product set p_name = ?, origin = ?, infotime = ?, storage = ?, transport = ? where p_id = ?'
    }
};

module.exports = sqlMap;
