#!/usr/bin/env bash
# @describe:
# @author:   Jerry Yang(hy0kle@gmail.com)

#set -x
npm run build_test && \
    cp -rf node_static/static /home/www/personal_loan/public/admin/ && \
    cp node_static/index.0.tpl  /home/www/personal_loan/application/views/admin/ && \
    mv /home/www/personal_loan/application/views/admin/index.0.tpl /home/www/personal_loan/application/views/admin/index.tpl
# vim:set ts=4 sw=4 et fdm=marker:

