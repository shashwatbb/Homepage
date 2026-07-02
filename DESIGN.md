# DESIGN.md -- Demand Component Kit

<!-- extraction-meta
source: Figma file "Demand Component Kit"
scope: 11 page(s)
date: 2026-07-01
nodes-scanned: 45619
generator: figma-cli extract
-->

> **Structure trees auto-split** (~186k tokens — too large for one AI context): per-page trees are in `DESIGN-structure/`. Use `--no-split` to force a single file.

## 1. Identity

**In one line:** A design system using Rubik, Inter, Product Sans, Google Sans Flex, Roboto, Arial, Mail Sans Roman with 578 unique colors extracted directly from Figma.

**Signature Techniques:**
- Consistent auto-layout spacing system
- Component library with 272 variants across 81 component sets

## 2. Color

### Palette

| Token | Hex | Usage count |
|---|---|---|
| background | `#ffffff` | 1122 |
| text-primary | `#222222` | 283 |
| surface | `#e1e2e8` | 276 |
| accent | `#5e23dc` | 266 |
| text-secondary | `#434343` | 248 |
| text-tertiary | `#767676` | 233 |
| text-primary-alt | `#000000` | 196 |
| surface-alt | `#d9d9d9` | 150 |
| accent-alt | `#edebdf` | 146 |
| text-primary-3 | `#0f0e0d` | 144 |
| text-secondary-alt | `#656565` | 138 |
| border | `#d8d8d8` | 94 |
| surface-3 | `#f2f3f8` | 88 |
| border-alt | `#ddd9ce` | 82 |
| accent-3 | `#8a38f5` | 78 |
| text-secondary-3 | `#666666` | 63 |
| text-secondary-4 | `#444444` | 58 |
| background-alt | `#faf9f5` | 48 |
| surface-4 | `#f5f5f5` | 48 |
| surface-5 | `#e9eaff` | 34 |
| accent-4 | `#401045` | 32 |
| text-tertiary-alt | `#747474` | 31 |
| text-primary-4 | `#1b1b1c` | 27 |
| accent-5 | `#f6f4ed` | 25 |
| accent-6 | `#9792ff` | 24 |
| background-3 | `#fafafa` | 22 |
| accent-7 | `#1f0247` | 22 |
| accent-8 | `#d2d3ff` | 21 |
| accent-9 | `#4a16d9` | 19 |
| surface-6 | `#f6f1f8` | 19 |
| text-primary-5 | `#333333` | 17 |
| background-4 | `#f8f9ff` | 15 |
| text-tertiary-3 | `#7f7f7f` | 14 |
| surface-7 | `#e0e0e0` | 13 |
| text-primary-6 | `#191919` | 13 |
| accent-10 | `#7a48f6` | 13 |
| text-primary-7 | `#1e1b24` | 13 |
| background-5 | `#f4f2ff` | 12 |
| text-secondary-5 | `#6c6c6c` | 12 |
| surface-8 | `#f1f2f7` | 12 |
| accent-11 | `#40268b` | 12 |
| text-secondary-6 | `#555555` | 11 |
| accent-12 | `#e80067` | 11 |
| accent-13 | `#d1d2ff` | 11 |
| accent-14 | `#d2624a` | 10 |
| accent-15 | `#fe88c1` | 10 |
| text-tertiary-4 | `#757575` | 10 |
| border-3 | `#c4c4c4` | 9 |
| accent-16 | `#eee4f1` | 9 |
| accent-17 | `#ed1b8a` | 9 |
| border-4 | `#999999` | 8 |
| border-5 | `#cccccc` | 8 |
| text-primary-8 | `#3c3630` | 8 |
| surface-9 | `#f1ebff` | 8 |
| accent-18 | `#6a44d3` | 8 |
| accent-19 | `#f85181` | 8 |
| surface-10 | `#dbdbdb` | 8 |
| accent-20 | `#008f4b` | 7 |
| surface-11 | `#e8e8e8` | 7 |
| accent-21 | `#0f8458` | 7 |
| accent-22 | `#eae4ff` | 7 |
| text-primary-9 | `#1c1c1c` | 7 |
| accent-23 | `#f7a58d` | 7 |
| accent-24 | `#31166f` | 7 |
| accent-25 | `#62d883` | 6 |
| accent-26 | `#245f36` | 6 |
| accent-27 | `#5f25dc` | 6 |
| background-6 | `#f8f5ff` | 5 |
| accent-28 | `#6b3d97` | 5 |
| accent-29 | `#5e40e0` | 5 |
| accent-30 | `#292949` | 5 |
| accent-31 | `#9791ff` | 5 |
| accent-32 | `#f0ece3` | 5 |
| surface-12 | `#ebebeb` | 5 |
| accent-33 | `#27aa4b` | 4 |
| text-primary-10 | `#323232` | 4 |
| accent-34 | `#fff6e5` | 4 |
| accent-35 | `#b9a1eb` | 4 |
| accent-36 | `#6a1bc2` | 4 |
| surface-13 | `#edfff8` | 4 |
| surface-14 | `#f7f7f7` | 4 |
| border-6 | `#9f9f9f` | 4 |
| accent-37 | `#36c991` | 4 |
| accent-38 | `#e81c28` | 4 |
| surface-15 | `#e8e9ff` | 4 |
| text-secondary-7 | `#61605d` | 4 |
| accent-39 | `#f955a3` | 4 |
| accent-40 | `#fbd1e8` | 4 |
| accent-41 | `#ff9acb` | 4 |
| surface-16 | `#e5e5e5` | 4 |
| surface-17 | `#eaf3ff` | 3 |
| text-tertiary-5 | `#a09890` | 3 |
| accent-42 | `#fadf4f` | 3 |
| text-secondary-8 | `#4e4e4e` | 3 |
| accent-43 | `#e5b45f` | 3 |
| surface-18 | `#e6e6e6` | 3 |
| surface-19 | `#fff0ee` | 3 |
| accent-44 | `#dbb680` | 3 |
| accent-45 | `#e980c0` | 3 |
| border-7 | `#bababa` | 3 |
| accent-46 | `#73a9b5` | 3 |
| accent-47 | `#703aff` | 3 |
| accent-48 | `#f4866e` | 3 |
| accent-49 | `#5f00ff` | 3 |
| accent-50 | `#1f7570` | 3 |
| accent-51 | `#8c5bbb` | 3 |
| accent-52 | `#5530d3` | 3 |
| accent-53 | `#b8b1f9` | 3 |
| text-tertiary-6 | `#979797` | 3 |
| border-8 | `#a4a4a4` | 3 |
| accent-54 | `#652a2a` | 2 |
| accent-55 | `#e89340` | 2 |
| accent-56 | `#7422dc` | 2 |
| border-9 | `#9d9e9f` | 2 |
| surface-20 | `#edf8ee` | 2 |
| surface-21 | `#e8e6ff` | 2 |
| accent-57 | `#ffdc00` | 2 |
| accent-58 | `#ffab00` | 2 |
| surface-22 | `#dadada` | 2 |
| text-tertiary-7 | `#908f8f` | 2 |
| text-tertiary-8 | `#7d756c` | 2 |
| accent-59 | `#cdad45` | 2 |
| accent-60 | `#dab580` | 2 |
| accent-61 | `#efc2d8` | 2 |
| accent-62 | `#e980c1` | 2 |
| accent-63 | `#e445ab` | 2 |
| accent-64 | `#e339a1` | 2 |
| accent-65 | `#91246e` | 2 |
| accent-66 | `#9747ff` | 2 |
| accent-67 | `#9b6fec` | 2 |
| accent-68 | `#0e3f3c` | 2 |
| surface-23 | `#ededed` | 2 |
| accent-69 | `#dd3387` | 2 |
| accent-70 | `#fedc3a` | 2 |
| accent-71 | `#7323dd` | 2 |
| accent-72 | `#ea4335` | 2 |
| accent-73 | `#4285f4` | 2 |
| accent-74 | `#34a853` | 2 |
| accent-75 | `#edccff` | 2 |
| surface-24 | `#fffceb` | 2 |
| accent-76 | `#ffe01f` | 2 |
| accent-77 | `#e5def9` | 2 |
| text-secondary-9 | `#646464` | 2 |
| accent-78 | `#1dd38f` | 2 |
| text-secondary-10 | `#464646` | 2 |
| text-primary-11 | `#1e1e1e` | 1 |
| surface-25 | `#ebeaea` | 1 |
| accent-79 | `#ceeedc` | 1 |
| surface-26 | `#ebe7de` | 1 |
| accent-80 | `#ea4236` | 1 |
| accent-81 | `#ffdf83` | 1 |
| background-7 | `#f3f7ff` | 1 |
| text-tertiary-9 | `#7d7d7d` | 1 |
| accent-82 | `#5945ed` | 1 |
| accent-83 | `#f20062` | 1 |
| text-secondary-11 | `#835353` | 1 |
| accent-84 | `#5875e9` | 1 |
| accent-85 | `#e0b02d` | 1 |
| surface-27 | `#f4f4f4` | 1 |
| accent-86 | `#f22b68` | 1 |
| surface-28 | `#e9e9e9` | 1 |
| accent-87 | `#ffd88a` | 1 |
| accent-88 | `#bb281b` | 1 |
| background-8 | `#fefefe` | 1 |
| accent-89 | `#7c4718` | 1 |
| text-secondary-12 | `#5b7479` | 1 |
| accent-90 | `#2f7f49` | 1 |
| accent-91 | `#be3f31` | 1 |
| accent-92 | `#ff1a87` | 1 |
| accent-93 | `#8c7aed` | 1 |
| accent-94 | `#1b1f80` | 1 |
| accent-95 | `#cdad46` | 1 |
| accent-96 | `#cdad47` | 1 |
| accent-97 | `#cead48` | 1 |
| accent-98 | `#ceae49` | 1 |
| accent-99 | `#ceae4a` | 1 |
| accent-100 | `#ceae4b` | 1 |
| accent-101 | `#cfae4c` | 1 |
| accent-102 | `#cfae4d` | 1 |
| accent-103 | `#cfae4e` | 1 |
| accent-104 | `#cfae4f` | 1 |
| accent-105 | `#cfaf50` | 1 |
| accent-106 | `#d0af51` | 1 |
| accent-107 | `#d0af52` | 1 |
| accent-108 | `#d0af53` | 1 |
| accent-109 | `#d0af54` | 1 |
| accent-110 | `#d1af55` | 1 |
| accent-111 | `#d1af56` | 1 |
| accent-112 | `#d1af57` | 1 |
| accent-113 | `#d1b058` | 1 |
| accent-114 | `#d1b059` | 1 |
| accent-115 | `#d2b05a` | 1 |
| accent-116 | `#d2b05b` | 1 |
| accent-117 | `#d2b05c` | 1 |
| accent-118 | `#d2b05d` | 1 |
| accent-119 | `#d3b05e` | 1 |
| accent-120 | `#d3b15f` | 1 |
| accent-121 | `#d3b160` | 1 |
| accent-122 | `#d3b161` | 1 |
| accent-123 | `#d3b162` | 1 |
| accent-124 | `#d4b163` | 1 |
| accent-125 | `#d4b164` | 1 |
| accent-126 | `#d4b165` | 1 |
| accent-127 | `#d4b266` | 1 |
| accent-128 | `#d5b267` | 1 |
| accent-129 | `#d5b268` | 1 |
| accent-130 | `#d5b269` | 1 |
| accent-131 | `#d5b26a` | 1 |
| accent-132 | `#d6b26b` | 1 |
| accent-133 | `#d6b26c` | 1 |
| accent-134 | `#d6b36d` | 1 |
| accent-135 | `#d6b36e` | 1 |
| accent-136 | `#d6b36f` | 1 |
| accent-137 | `#d7b370` | 1 |
| accent-138 | `#d7b371` | 1 |
| accent-139 | `#d7b372` | 1 |
| accent-140 | `#d7b373` | 1 |
| accent-141 | `#d8b374` | 1 |
| accent-142 | `#d8b475` | 1 |
| accent-143 | `#d8b476` | 1 |
| accent-144 | `#d8b477` | 1 |
| accent-145 | `#d8b478` | 1 |
| accent-146 | `#d9b479` | 1 |
| accent-147 | `#d9b47a` | 1 |
| accent-148 | `#d9b47b` | 1 |
| accent-149 | `#d9b57c` | 1 |
| accent-150 | `#dab57d` | 1 |
| accent-151 | `#dab57e` | 1 |
| accent-152 | `#dab57f` | 1 |
| accent-153 | `#dbb580` | 1 |
| accent-154 | `#dcb680` | 1 |
| accent-155 | `#dcb681` | 1 |
| accent-156 | `#dcb682` | 1 |
| accent-157 | `#dcb683` | 1 |
| accent-158 | `#dcb784` | 1 |
| accent-159 | `#ddb785` | 1 |
| accent-160 | `#ddb786` | 1 |
| accent-161 | `#ddb787` | 1 |
| accent-162 | `#ddb788` | 1 |
| accent-163 | `#deb789` | 1 |
| accent-164 | `#deb78a` | 1 |
| accent-165 | `#deb88c` | 1 |
| accent-166 | `#deb88d` | 1 |
| accent-167 | `#deb88e` | 1 |
| accent-168 | `#dfb88f` | 1 |
| accent-169 | `#dfb890` | 1 |
| accent-170 | `#dfb891` | 1 |
| accent-171 | `#dfb892` | 1 |
| accent-172 | `#e0b893` | 1 |
| accent-173 | `#e0b994` | 1 |
| accent-174 | `#e0b995` | 1 |
| accent-175 | `#e0b996` | 1 |
| accent-176 | `#e0b997` | 1 |
| accent-177 | `#e1b998` | 1 |
| accent-178 | `#e1b999` | 1 |
| accent-179 | `#e1b99a` | 1 |
| accent-180 | `#e1ba9b` | 1 |
| accent-181 | `#e2ba9c` | 1 |
| accent-182 | `#e2ba9d` | 1 |
| accent-183 | `#e2ba9e` | 1 |
| accent-184 | `#e2ba9f` | 1 |
| accent-185 | `#e2baa0` | 1 |
| accent-186 | `#e3baa1` | 1 |
| accent-187 | `#e3bba2` | 1 |
| accent-188 | `#e3bba3` | 1 |
| accent-189 | `#e3bba4` | 1 |
| accent-190 | `#e4bba5` | 1 |
| accent-191 | `#e4bba6` | 1 |
| accent-192 | `#e4bba7` | 1 |
| accent-193 | `#e4bba8` | 1 |
| accent-194 | `#e4bca9` | 1 |
| accent-195 | `#e5bcaa` | 1 |
| accent-196 | `#e5bcab` | 1 |
| accent-197 | `#e5bcac` | 1 |
| accent-198 | `#e5bcad` | 1 |
| accent-199 | `#e6bcae` | 1 |
| accent-200 | `#e6bcaf` | 1 |
| accent-201 | `#e6bcb0` | 1 |
| accent-202 | `#e6bdb1` | 1 |
| accent-203 | `#e7bdb2` | 1 |
| accent-204 | `#e7bdb3` | 1 |
| accent-205 | `#e7bdb4` | 1 |
| accent-206 | `#e7bdb5` | 1 |
| accent-207 | `#e7bdb6` | 1 |
| accent-208 | `#e8bdb7` | 1 |
| accent-209 | `#e8beb8` | 1 |
| accent-210 | `#e8beb9` | 1 |
| accent-211 | `#e8beba` | 1 |
| accent-212 | `#e9bebb` | 1 |
| accent-213 | `#e9bebc` | 1 |
| accent-214 | `#e9bebd` | 1 |
| accent-215 | `#e9bebe` | 1 |
| accent-216 | `#e9bfbf` | 1 |
| accent-217 | `#eabfc0` | 1 |
| accent-218 | `#eabfc1` | 1 |
| accent-219 | `#eabfc2` | 1 |
| accent-220 | `#eabfc3` | 1 |
| accent-221 | `#ebbfc4` | 1 |
| accent-222 | `#ebbfc5` | 1 |
| accent-223 | `#ebc0c6` | 1 |
| accent-224 | `#ebc0c7` | 1 |
| accent-225 | `#ebc0c8` | 1 |
| accent-226 | `#ecc0c9` | 1 |
| accent-227 | `#ecc0ca` | 1 |
| accent-228 | `#ecc0cb` | 1 |
| accent-229 | `#ecc0cc` | 1 |
| accent-230 | `#edc0cd` | 1 |
| accent-231 | `#edc1ce` | 1 |
| accent-232 | `#edc1cf` | 1 |
| accent-233 | `#edc1d0` | 1 |
| accent-234 | `#edc1d1` | 1 |
| accent-235 | `#eec1d2` | 1 |
| accent-236 | `#eec1d3` | 1 |
| accent-237 | `#eec1d4` | 1 |
| accent-238 | `#eec2d5` | 1 |
| accent-239 | `#efc2d6` | 1 |
| accent-240 | `#efc2d7` | 1 |
| accent-241 | `#efc1d8` | 1 |
| accent-242 | `#efc0d7` | 1 |
| accent-243 | `#efbfd7` | 1 |
| accent-244 | `#efbed7` | 1 |
| accent-245 | `#efbdd6` | 1 |
| accent-246 | `#eebcd6` | 1 |
| accent-247 | `#eebbd6` | 1 |
| accent-248 | `#eebad5` | 1 |
| accent-249 | `#eeb9d5` | 1 |
| accent-250 | `#eeb8d5` | 1 |
| accent-251 | `#eeb7d4` | 1 |
| accent-252 | `#eeb6d4` | 1 |
| accent-253 | `#eeb5d4` | 1 |
| accent-254 | `#eeb4d3` | 1 |
| accent-255 | `#eeb3d3` | 1 |
| accent-256 | `#eeb2d2` | 1 |
| accent-257 | `#eeb1d2` | 1 |
| accent-258 | `#edb0d2` | 1 |
| accent-259 | `#edafd1` | 1 |
| accent-260 | `#edaed1` | 1 |
| accent-261 | `#edadd1` | 1 |
| accent-262 | `#edacd0` | 1 |
| accent-263 | `#edabd0` | 1 |
| accent-264 | `#edaad0` | 1 |
| accent-265 | `#eda9cf` | 1 |
| accent-266 | `#eda8cf` | 1 |
| accent-267 | `#eda7cf` | 1 |
| accent-268 | `#eda6ce` | 1 |
| accent-269 | `#eda5ce` | 1 |
| accent-270 | `#eca4ce` | 1 |
| accent-271 | `#eca3cd` | 1 |
| accent-272 | `#eca2cd` | 1 |
| accent-273 | `#eca1cd` | 1 |
| accent-274 | `#eca0cc` | 1 |
| accent-275 | `#ec9fcc` | 1 |
| accent-276 | `#ec9ecc` | 1 |
| accent-277 | `#ec9dcb` | 1 |
| accent-278 | `#ec9ccb` | 1 |
| accent-279 | `#ec9bcb` | 1 |
| accent-280 | `#ec9aca` | 1 |
| accent-281 | `#ec99ca` | 1 |
| accent-282 | `#eb98c9` | 1 |
| accent-283 | `#eb97c9` | 1 |
| accent-284 | `#eb96c9` | 1 |
| accent-285 | `#eb95c8` | 1 |
| accent-286 | `#eb94c8` | 1 |
| accent-287 | `#eb93c8` | 1 |
| accent-288 | `#eb92c7` | 1 |
| accent-289 | `#eb91c7` | 1 |
| accent-290 | `#eb90c7` | 1 |
| accent-291 | `#eb8fc6` | 1 |
| accent-292 | `#eb8ec6` | 1 |
| accent-293 | `#eb8dc6` | 1 |
| accent-294 | `#ea8cc5` | 1 |
| accent-295 | `#ea8bc5` | 1 |
| accent-296 | `#ea8ac5` | 1 |
| accent-297 | `#ea89c4` | 1 |
| accent-298 | `#ea88c4` | 1 |
| accent-299 | `#ea87c4` | 1 |
| accent-300 | `#ea86c3` | 1 |
| accent-301 | `#ea85c3` | 1 |
| accent-302 | `#ea84c3` | 1 |
| accent-303 | `#ea83c2` | 1 |
| accent-304 | `#ea82c2` | 1 |
| accent-305 | `#ea81c2` | 1 |
| accent-306 | `#e980bf` | 1 |
| accent-307 | `#e97fbf` | 1 |
| accent-308 | `#e97ebf` | 1 |
| accent-309 | `#e97dbe` | 1 |
| accent-310 | `#e97cbe` | 1 |
| accent-311 | `#e97bbe` | 1 |
| accent-312 | `#e87abd` | 1 |
| accent-313 | `#e879bd` | 1 |
| accent-314 | `#e878bd` | 1 |
| accent-315 | `#e877bc` | 1 |
| accent-316 | `#e876bc` | 1 |
| accent-317 | `#e875bc` | 1 |
| accent-318 | `#e874bb` | 1 |
| accent-319 | `#e873bb` | 1 |
| accent-320 | `#e872bb` | 1 |
| accent-321 | `#e871ba` | 1 |
| accent-322 | `#e870ba` | 1 |
| accent-323 | `#e86fba` | 1 |
| accent-324 | `#e76eb9` | 1 |
| accent-325 | `#e76db9` | 1 |
| accent-326 | `#e76cb9` | 1 |
| accent-327 | `#e76bb8` | 1 |
| accent-328 | `#e76ab8` | 1 |
| accent-329 | `#e769b7` | 1 |
| accent-330 | `#e768b7` | 1 |
| accent-331 | `#e767b7` | 1 |
| accent-332 | `#e766b6` | 1 |
| accent-333 | `#e765b6` | 1 |
| accent-334 | `#e764b6` | 1 |
| accent-335 | `#e763b5` | 1 |
| accent-336 | `#e662b5` | 1 |
| accent-337 | `#e661b5` | 1 |
| accent-338 | `#e660b4` | 1 |
| accent-339 | `#e65fb4` | 1 |
| accent-340 | `#e65eb4` | 1 |
| accent-341 | `#e65db3` | 1 |
| accent-342 | `#e65cb3` | 1 |
| accent-343 | `#e65bb3` | 1 |
| accent-344 | `#e65ab2` | 1 |
| accent-345 | `#e659b2` | 1 |
| accent-346 | `#e658b2` | 1 |
| accent-347 | `#e657b1` | 1 |
| accent-348 | `#e556b1` | 1 |
| accent-349 | `#e555b1` | 1 |
| accent-350 | `#e554b0` | 1 |
| accent-351 | `#e553b0` | 1 |
| accent-352 | `#e552b0` | 1 |
| accent-353 | `#e551af` | 1 |
| accent-354 | `#e550af` | 1 |
| accent-355 | `#e54fae` | 1 |
| accent-356 | `#e54eae` | 1 |
| accent-357 | `#e54dae` | 1 |
| accent-358 | `#e54cad` | 1 |
| accent-359 | `#e54bad` | 1 |
| accent-360 | `#e44aad` | 1 |
| accent-361 | `#e449ac` | 1 |
| accent-362 | `#e448ac` | 1 |
| accent-363 | `#e447ac` | 1 |
| accent-364 | `#e446ab` | 1 |
| accent-365 | `#e444aa` | 1 |
| accent-366 | `#e443a9` | 1 |
| accent-367 | `#e442a8` | 1 |
| accent-368 | `#e441a7` | 1 |
| accent-369 | `#e440a6` | 1 |
| accent-370 | `#e33ea6` | 1 |
| accent-371 | `#e33da5` | 1 |
| accent-372 | `#e33ca4` | 1 |
| accent-373 | `#e33ba3` | 1 |
| accent-374 | `#e33aa2` | 1 |
| accent-375 | `#e239a0` | 1 |
| accent-376 | `#e138a0` | 1 |
| accent-377 | `#e0389f` | 1 |
| accent-378 | `#df389e` | 1 |
| accent-379 | `#de389d` | 1 |
| accent-380 | `#dd379d` | 1 |
| accent-381 | `#dc379c` | 1 |
| accent-382 | `#db379b` | 1 |
| accent-383 | `#da379b` | 1 |
| accent-384 | `#d9369a` | 1 |
| accent-385 | `#d83699` | 1 |
| accent-386 | `#d73699` | 1 |
| accent-387 | `#d63698` | 1 |
| accent-388 | `#d53597` | 1 |
| accent-389 | `#d43596` | 1 |
| accent-390 | `#d33596` | 1 |
| accent-391 | `#d23595` | 1 |
| accent-392 | `#d13494` | 1 |
| accent-393 | `#d03494` | 1 |
| accent-394 | `#cf3493` | 1 |
| accent-395 | `#ce3492` | 1 |
| accent-396 | `#cd3392` | 1 |
| accent-397 | `#cc3391` | 1 |
| accent-398 | `#cb3390` | 1 |
| accent-399 | `#ca338f` | 1 |
| accent-400 | `#c9328f` | 1 |
| accent-401 | `#c8328e` | 1 |
| accent-402 | `#c7328d` | 1 |
| accent-403 | `#c6318d` | 1 |
| accent-404 | `#c5318c` | 1 |
| accent-405 | `#c4318b` | 1 |
| accent-406 | `#c3318a` | 1 |
| accent-407 | `#c2308a` | 1 |
| accent-408 | `#c13089` | 1 |
| accent-409 | `#c03088` | 1 |
| accent-410 | `#bf3088` | 1 |
| accent-411 | `#be2f87` | 1 |
| accent-412 | `#bd2f86` | 1 |
| accent-413 | `#bc2f86` | 1 |
| accent-414 | `#bb2f85` | 1 |
| accent-415 | `#b92e84` | 1 |
| accent-416 | `#b82e83` | 1 |
| accent-417 | `#b72e83` | 1 |
| accent-418 | `#b62e82` | 1 |
| accent-419 | `#b52d81` | 1 |
| accent-420 | `#b42d81` | 1 |
| accent-421 | `#b32d80` | 1 |
| accent-422 | `#b22d80` | 1 |
| accent-423 | `#b12c80` | 1 |
| accent-424 | `#b02c80` | 1 |
| accent-425 | `#af2c80` | 1 |
| accent-426 | `#ae2c80` | 1 |
| accent-427 | `#ad2b80` | 1 |
| accent-428 | `#ac2b80` | 1 |
| accent-429 | `#ab2b80` | 1 |
| accent-430 | `#aa2a80` | 1 |
| accent-431 | `#a92a7f` | 1 |
| accent-432 | `#a82a7e` | 1 |
| accent-433 | `#a72a7d` | 1 |
| accent-434 | `#a6297d` | 1 |
| accent-435 | `#a5297c` | 1 |
| accent-436 | `#a4297b` | 1 |
| accent-437 | `#a3297b` | 1 |
| accent-438 | `#a2287a` | 1 |
| accent-439 | `#a12879` | 1 |
| accent-440 | `#a02879` | 1 |
| accent-441 | `#9f2878` | 1 |
| accent-442 | `#9e2777` | 1 |
| accent-443 | `#9d2776` | 1 |
| accent-444 | `#9c2776` | 1 |
| accent-445 | `#9b2775` | 1 |
| accent-446 | `#9a2674` | 1 |
| accent-447 | `#992674` | 1 |
| accent-448 | `#982673` | 1 |
| accent-449 | `#972672` | 1 |
| accent-450 | `#962572` | 1 |
| accent-451 | `#952571` | 1 |
| accent-452 | `#942570` | 1 |
| accent-453 | `#93256f` | 1 |
| accent-454 | `#92246f` | 1 |
| text-primary-12 | `#181818` | 1 |
| accent-455 | `#5423d0` | 1 |
| accent-456 | `#5e41c8` | 1 |
| surface-29 | `#f2ebfe` | 1 |
| background-9 | `#f9f9f9` | 1 |
| accent-457 | `#8e90fa` | 1 |
| accent-458 | `#f17b61` | 1 |
| accent-459 | `#206c68` | 1 |
| accent-460 | `#c2c2ff` | 1 |
| accent-461 | `#4f1aa1` | 1 |
| accent-462 | `#b8bbf4` | 1 |
| accent-463 | `#648ee2` | 1 |
| accent-464 | `#ffcc00` | 1 |
| accent-465 | `#ed5196` | 1 |
| accent-466 | `#f746a7` | 1 |
| accent-467 | `#61aab6` | 1 |
| accent-468 | `#f6cd46` | 1 |
| accent-469 | `#e5e5ff` | 1 |
| accent-470 | `#e2e1f2` | 1 |
| accent-471 | `#ff007a` | 1 |
| accent-472 | `#e7e3bf` | 1 |
| border-10 | `#c3c3c3` | 1 |
| text-secondary-13 | `#524b40` | 1 |
| text-primary-13 | `#000100` | 1 |
| text-primary-14 | `#030303` | 1 |
| text-primary-15 | `#0e0b0f` | 1 |
| accent-473 | `#161424` | 1 |
| accent-474 | `#0f0f2a` | 1 |
| text-secondary-14 | `#393752` | 1 |
| accent-475 | `#fdf5d0` | 1 |
| accent-476 | `#d6bce4` | 1 |
| accent-477 | `#fbbc04` | 1 |
| accent-478 | `#fbbc05` | 1 |
| accent-479 | `#25d366` | 1 |
| accent-480 | `#edc76e` | 1 |
| accent-481 | `#e7ddfb` | 1 |
| accent-482 | `#eaac40` | 1 |
| surface-30 | `#fefced` | 1 |
| accent-483 | `#fdf0b1` | 1 |
| border-11 | `#9c9c9c` | 1 |
| border-12 | `#a6a6a6` | 1 |
| accent-484 | `#efb40e` | 1 |
| accent-485 | `#292400` | 1 |
| accent-486 | `#f286b5` | 1 |
| surface-31 | `#e9e5de` | 1 |
| text-secondary-15 | `#5f5f59` | 1 |
| surface-32 | `#ecedf0` | 1 |

## 3. Variables

Real Figma variable collections — the authoritative tokens (names, modes, values). These come straight from the file, unlike the sampled palette above. `figma-cli import` can recreate them as variables.

### Collection: Collection 1  ·  11 variables  ·  modes: Mode 1

| Variable | Type | Mode 1 |
|---|---|---|
| Primary | COLOR | `#c7ff29` |
| BG | COLOR | `#f3f7ff` |
| Icon 1 | COLOR | `#ee6a5f` |
| Icon 2 | COLOR | `#f5bd4f` |
| Icon 3 | COLOR | `#61c454` |
| Primary BG | COLOR | `#f9f9f9` |
| Spacing | FLOAT | 12 |
| Spacing 2 | FLOAT | 80 |
| CTA Primary hover | COLOR | `#e2ff91` |
| Deep Black | COLOR | `#1a1d1c` |
| Card BG | COLOR | `#fcfafe` |

## 4. Typography

### Fonts

- Rubik
- Inter
- Product Sans
- Google Sans Flex
- Roboto
- Arial
- Mail Sans Roman

### Scale

| Token | Family | Size | Weight | Line height |
|---|---|---|---|---|
| display | Mail Sans Roman | 88px | 700 | auto |
| display-2 | Mail Sans Roman | 38.251319885253906px | 500 | auto |
| display-3 | Google Sans Flex | 36px | 700 | auto |
| display-4 | Rubik | 36px | 400 | auto |
| h1 | Google Sans Flex | 32px | 600 | 40px |
| h1-2 | Rubik | 32px | 500 | 36px |
| h2 | Google Sans Flex | 28px | 600 | 36px |
| h2-2 | Rubik | 28px | 500 | 32px |
| h2-3 | Google Sans Flex | 28px | 700 | 36px |
| h3 | Google Sans Flex | 24px | 500 | auto |
| h4 | Rubik | 22px | 500 | 28px |
| h5 | Rubik | 20.5px | 400 | auto |
| h6 | Inter | 18px | 500 | auto |
| h6-2 | Rubik | 18px | 500 | 20px |
| h6-3 | Google Sans Flex | 18px | 600 | 26px |
| h6-4 | Rubik | 18px | 500 | auto |
| h6-5 | Google Sans Flex | 18px | 500 | 24px |
| body-lg | Rubik | 17px | 500 | auto |
| body-lg-2 | Rubik | 16.5px | 500 | 26px |
| body-lg-3 | Rubik | 16px | 500 | 20px |
| body-lg-4 | Google Sans Flex | 16px | 500 | 22px |
| body-lg-5 | Google Sans Flex | 16px | 400 | 22px |
| body-lg-6 | Rubik | 16px | 400 | 20px |
| body-lg-7 | Google Sans Flex | 16px | 500 | 24px |
| body-lg-8 | Google Sans Flex | 16px | 600 | 22px |
| body-lg-9 | Rubik | 16px | 600 | 18px |
| body-lg-10 | Rubik | 16px | 500 | auto |
| body-lg-11 | Google Sans Flex | 16px | 400 | 24px |
| body | Rubik | 15.25px | 500 | 28px |
| body-2 | Rubik | 14.229114532470703px | 400 | 18.972152709960938px |
| body-3 | Rubik | 14px | 500 | 16px |
| body-4 | Rubik | 14px | 400 | 16px |
| body-5 | Google Sans Flex | 14px | 400 | 16px |
| body-6 | Google Sans Flex | 14px | 500 | 20px |
| body-7 | Google Sans Flex | 14px | 500 | 16px |
| body-8 | Google Sans Flex | 14px | 400 | 20px |
| body-9 | Rubik | 14px | 500 | auto |
| body-10 | Rubik | 14px | 400 | auto |
| body-11 | Product Sans | 14px | 400 | auto |
| body-12 | Rubik | 14px | 400 | 17px |
| body-13 | Rubik | 14px | 500 | 20px |
| body-14 | Rubik | 14px | 400 | 20px |
| body-15 | Google Sans Flex | 14px | 500 | 20px |
| body-16 | Roboto | 14px | 500 | 22px |
| body-17 | Google Sans Flex | 14px | 600 | 16px |
| body-18 | Google Sans Flex | 14px | 400 | 16px |
| body-19 | Google Sans Flex | 14px | 500 | 12.139406204223633px |
| body-20 | Rubik | 14px | 400 | 17px |
| body-21 | Rubik | 14px | 400 | 19px |
| body-22 | Rubik | 14px | 500 | 18px |
| body-23 | Roboto | 14px | 400 | 16px |
| body-sm | Google Sans Flex | 12.5px | 300 | 18px |
| body-sm-2 | Rubik | 12.5px | 300 | 44px |
| body-sm-3 | Rubik | 12.5px | 300 | 18px |
| body-sm-4 | Rubik | 12.5px | 400 | 14px |
| body-sm-5 | Rubik | 12.5px | 400 | 12px |
| body-sm-6 | Rubik | 12.5px | 400 | 40px |
| caption | Rubik | 12px | 400 | 16px |
| caption-2 | Rubik | 12px | 500 | 16px |
| caption-3 | Rubik | 12px | 400 | auto |
| caption-4 | Google Sans Flex | 12px | 400 | 16px |
| caption-5 | Google Sans Flex | 12px | 400 | 16px |
| caption-6 | Rubik | 12px | 400 | 16px |
| caption-7 | Rubik | 12px | 500 | auto |
| caption-8 | Roboto | 12px | 400 | auto |
| caption-9 | Roboto | 12px | 400 | auto |
| caption-10 | Rubik | 12px | 400 | 20px |
| caption-11 | Google Sans Flex | 12px | 500 | 16px |
| caption-12 | Roboto | 12px | 500 | auto |
| caption-13 | Rubik | 12px | 400 | auto |
| caption-14 | Google Sans Flex | 12px | 500 | 16px |
| caption-15 | Rubik | 12px | 400 | 18px |
| caption-16 | Roboto | 12px | 500 | auto |
| caption-17 | Rubik | 12px | 500 | 16px |
| caption-18 | Rubik | 12px | 400 | 16px |
| caption-19 | Rubik | 12px | 500 | 17px |
| caption-20 | Rubik | 12px | 400 | 14px |
| caption-21 | Roboto | 12px | 500 | 20px |
| caption-22 | Roboto | 12px | 400 | 16px |
| caption-23 | Roboto | 12px | 400 | 17px |
| caption-24 | Roboto | 12px | 400 | 17px |
| caption-25 | Roboto | 12px | 500 | 17px |
| caption-26 | Rubik | 11.5px | 400 | 19px |
| caption-27 | Google Sans Flex | 10.621980667114258px | 500 | 12.139406204223633px |
| caption-28 | Rubik | 10.5px | 300 | 18px |
| caption-29 | Rubik | 10px | 400 | 12px |
| caption-30 | Rubik | 10px | 500 | 12px |
| caption-31 | Google Sans Flex | 10px | 400 | 12px |
| caption-32 | Rubik | 10px | 400 | auto |
| caption-33 | Google Sans Flex | 10px | 400 | 14px |
| caption-34 | Rubik | 10px | 600 | 14px |
| caption-35 | Rubik | 10px | 500 | 16px |
| caption-36 | Arial | 10px | 400 | auto |
| caption-37 | Rubik | 10px | 400 | 12px |
| caption-38 | Roboto | 10px | 400 | 12px |
| caption-39 | Roboto | 10px | 400 | 12px |
| caption-40 | Roboto | 10px | 500 | auto |
| caption-41 | Rubik | 10px | 500 | 12px |
| caption-42 | Rubik | 9px | 400 | 12px |
| caption-43 | Rubik | 9px | 500 | auto |

## 5. Spacing & Layout

### Base Unit

2px

### Border Radius

| Token | Value |
|---|---|
| radius-sm | 0.5px |
| radius-md | 0.5867969989776611px |
| radius-lg | 0.6000000238418579px |
| radius-lg-2 | 1px |
| radius-lg-3 | 1.1735939979553223px |
| radius-lg-4 | 1.363629937171936px |
| radius-lg-5 | 1.5px |
| radius-lg-6 | 2px |
| radius-lg-7 | 2.272716522216797px |
| radius-lg-8 | 2.5px |
| radius-lg-9 | 3px |
| radius-lg-10 | 3.98101806640625px |
| radius-lg-11 | 4px |
| radius-lg-12 | 4.743038177490234px |
| radius-lg-13 | 5px |
| radius-lg-14 | 7.384615421295166px |
| radius-lg-15 | 8px |
| radius-lg-16 | 8.727272033691406px |
| radius-lg-17 | 9.069767951965332px |
| radius-lg-18 | 9.104555130004883px |
| radius-lg-19 | 9.163207054138184px |
| radius-lg-20 | 10px |
| radius-lg-21 | 10.322580337524414px |
| radius-lg-22 | 11px |
| radius-lg-23 | 11.113187789916992px |
| radius-lg-24 | 11.735940933227539px |
| radius-lg-25 | 11.999998092651367px |
| radius-lg-26 | 12px |
| radius-lg-27 | 13px |
| radius-lg-28 | 15.570175170898438px |
| radius-lg-29 | 15.999998092651367px |
| radius-lg-30 | 16px |
| radius-lg-31 | 16.000001907348633px |
| radius-lg-32 | 17.85000228881836px |
| radius-lg-33 | 18px |
| radius-lg-34 | 19.999998092651367px |
| radius-lg-35 | 20px |
| radius-lg-36 | 21.38894271850586px |
| radius-lg-37 | 21.5px |
| radius-lg-38 | 22.5px |
| radius-lg-39 | 24px |
| radius-lg-40 | 25.09000015258789px |
| radius-lg-41 | 25.239437103271484px |
| radius-lg-42 | 27.000003814697266px |
| radius-lg-43 | 28px |
| radius-lg-44 | 29.339847564697266px |
| radius-lg-45 | 30px |
| radius-lg-46 | 30.513442993164062px |
| radius-lg-47 | 31px |
| radius-lg-48 | 32px |
| radius-lg-49 | 34.03422927856445px |
| radius-lg-50 | 35px |
| radius-lg-51 | 36.38142013549805px |
| radius-lg-52 | 38px |
| radius-lg-53 | 40px |
| radius-lg-54 | 40.73500442504883px |
| radius-lg-55 | 44px |
| radius-lg-56 | 60px |
| radius-lg-57 | 80px |
| radius-lg-58 | 99px |
| radius-lg-59 | 100px |
| radius-lg-60 | 116.66667175292969px |
| radius-lg-61 | 120px |
| radius-full | 999px |
| radius-full-2 | 2100px |

## 6. Depth & Motion

### Elevation

- 0px 0px 8.000000953674316px 0px #000000 @ 4% (used 24×)
- 0px 2px 2px 0px #f1f1f1 @ 100% (used 19×)
- BACKGROUND_BLUR blur 135.91409301757812px (used 8×)
- BACKGROUND_BLUR blur 12px (used 8×)
- LAYER_BLUR blur 0.5867969989776611px (used 8×)
- BACKGROUND_BLUR blur 80px (used 7×)
- inset 0px -18px 20px 0px #ffffff @ 86% (used 7×)
- 0px 2px 2px 0px #000000 @ 4% (used 7×)
- BACKGROUND_BLUR blur 8px (used 6×)
- LAYER_BLUR blur 0.7111037969589233px (used 6×)
- LAYER_BLUR blur 1.1735939979553223px (used 6×)
- 0px 8px 22px -6px #4b4941 @ 8% (used 5×)
- 0px 4px 4px 0px #000000 @ 25% (used 5×)
- LAYER_BLUR blur 0.4994637668132782px (used 5×)
- LAYER_BLUR blur 44px (used 5×)
- 0px 0px 8px 0px #000000 @ 16% (used 4×)
- BACKGROUND_BLUR blur 4px (used 4×)
- 6px 6px 40.5px 0px #e1cce9 @ 100% (used 4×)
- 0px 7.255814075469971px 22.674419403076172px 0px #000000 @ 25% (used 4×)
- LAYER_BLUR blur 0.6370406150817871px (used 4×)
- LAYER_BLUR blur 0.9069767594337463px (used 4×)
- 0px 0px 6px 0px #000000 @ 46% (used 3×)
- 0px 8px 24px 0px #000000 @ 24% (used 3×)
- LAYER_BLUR blur 0.14222078025341034px (used 3×)
- 0px 14px 64px -4px #4b4941 @ 8% (used 3×)
- 0px 0px 16px 0px #000000 @ 8% (used 3×)
- 0px -1px 16px 0px #000000 @ 16% (used 2×)
- LAYER_BLUR blur 50px (used 2×)
- BACKGROUND_BLUR blur 24px (used 2×)
- -2px 2px 32px 0px #000000 @ 4% (used 2×)
- 0px 0px 8px 0px #000000 @ 10% (used 2×)
- 0px 0px 10px 0px #000000 @ 45% (used 2×)
- 0px 0px 8px 0px #000000 @ 8% (used 2×)
- 0px 2px 2px 0px #f5f5f5 @ 100% (used 2×)
- BACKGROUND_BLUR blur 59.80220031738281px (used 2×)
- LAYER_BLUR blur 45.348838806152344px (used 2×)
- LAYER_BLUR blur 0.18139535188674927px (used 2×)
- LAYER_BLUR blur 35.55519104003906px (used 2×)
- BACKGROUND_BLUR blur 7.320590019226074px (used 2×)
- BACKGROUND_BLUR blur 5.436563491821289px (used 2×)
- 0px 2px 8px 0px #000000 @ 16% (used 1×)
- 0px 1.5438778400421143px 3.0877556800842285px -1.5438778400421143px #000000 @ 10% (used 1×)
- 0px 3.0877556800842285px 4.631633281707764px -0.7719389200210571px #000000 @ 10% (used 1×)
- 0px 3.692307710647583px 14.769230842590332px 0px #000000 @ 24% (used 1×)
- 0px 4px 4px 0px #c1bfbf @ 25% (used 1×)
- 0px 2px 4px 0px #000000 @ 20% (used 1×)
- 0.5px 0px 0px 0px #000000 @ 100% (used 1×)
- LAYER_BLUR blur 2px (used 1×)
- inset -0.6000000238418579px -0.6000000238418579px 0.7999999523162842px 0px #000000 @ 20% (used 1×)
- inset 0.6000000238418579px 0.6000000238418579px 0.3999999761581421px 0px #ffffff @ 25% (used 1×)
- 0px 4px 9.399999618530273px 0px #eaf2ff @ 100% (used 1×)
- 0px 4px 9.399999618530273px 0px #f0f0ff @ 100% (used 1×)
- inset 0px 0px 2px 0px #000000 @ 8% (used 1×)
- 0px -2px 8px 0px #f5f5f5 @ 100% (used 1×)
- inset -0.4800000488758087px -0.4800000488758087px 0.64000004529953px 0px #000000 @ 20% (used 1×)
- inset 0.4800000488758087px 0.4800000488758087px 0.320000022649765px 0px #ffffff @ 25% (used 1×)
- LAYER_BLUR blur 8px (used 1×)
- 0px 2px 24px 0px #000000 @ 25% (used 1×)
- inset -0.5760000944137573px -0.5760000944137573px 0.768000066280365px 0px #000000 @ 20% (used 1×)
- inset 0.5760000944137573px 0.5760000944137573px 0.3840000331401825px 0px #ffffff @ 25% (used 1×)
- 0px 4px 14px 0px #000000 @ 3% (used 1×)
- 0px 2px 8px 0px #000000 @ 8% (used 1×)
- 1px 1px 1px 0px #000000 @ 48% (used 1×)
- 0px 1px 4px 0px #000000 @ 24% (used 1×)
- 0px 1px 16px 0px #000000 @ 16% (used 1×)
- 0px 6px 0px 0px #ddd9ce @ 100% (used 1×)
- inset 2px 2px 14px 0px #505050 @ 100% (used 1×)
- inset 2px 2px 2px 0px #525252 @ 100% (used 1×)
- LAYER_BLUR blur 2.3471879959106445px (used 1×)
- LAYER_BLUR blur 4.107579231262207px (used 1×)
- 0px 3.999999761581421px 3.999999761581421px 0px #000000 @ 25% (used 1×)
- 0px 3.592982053756714px 6.287718296051025px 0px #c8c8c8 @ 25% (used 1×)
- 0px 2.0728743076324463px 3.6275293827056885px 0px #c8c8c8 @ 25% (used 1×)
- 0px 5.052631855010986px 8.8421049118042px 0px #c8c8c8 @ 25% (used 1×)
- 0px 3.8790628910064697px 6.788360118865967px 0px #c8c8c8 @ 25% (used 1×)
- 0px 3.491156816482544px 6.109524250030518px 0px #c8c8c8 @ 25% (used 1×)
- 0px 2px 12px 0px #000000 @ 8% (used 1×)
- BACKGROUND_BLUR blur 27.182817459106445px (used 1×)
- 0px 2px 5px 0px #000000 @ 30% (used 1×)
- BACKGROUND_BLUR blur 27px (used 1×)
- 0px 2px 12px 0px #000000 @ 15% (used 1×)
- 0px 0px 26px 0px #000000 @ 12% (used 1×)
- 0px 4px 20px 0px #000000 @ 38% (used 1×)
- 0px 1px 10px 0px #000000 @ 10% (used 1×)
- 0px 1px 4px 0px #000000 @ 12% (used 1×)
- 0px 2px 4px 0px #000000 @ 10% (used 1×)
- 0px 1px 2px 0px #000000 @ 5% (used 1×)

## 7. Components

### .PDP

Page: PDP  · 2 variants

Reuse: import existing — key `4aaa2db25125b30dd30f4a963a6a9ca0fb4e11ac` · node `13:313`

| Property | Values |
|---|---|
| Property 1 | .New Projects PDP, .Resale PDP |

Sample variant structure:

- **Property 1=.Resale PDP** · `COMPONENT` · 360×2177 · vertical stack, gap 16px, padding 16/0/16/0px · 15 children
  - **Frame 1000003893** · `FRAME` · 360×272 · vertical stack, gap 8px, padding 0/24/0/24px · 2 children
    - **Frame 1000003890** · `FRAME` · 312×248 · vertical stack, gap 16px · 2 children
      - **Frame 1000003873** · `FRAME` · 312×24 · horizontal row, gap 188px · 2 children
        - **Group 1000003757** · `GROUP` · 24×24 · 1 children
          - **Back Icon** · `GROUP` · 24×24 · 2 children
            - **Mask** · `RECTANGLE` · 24×24
            - **Group 1000004307** · `GROUP` · 16×14 · 3 children
              - **Vector 794** · `VECTOR` · 7×7
              - **Vector 795** · `VECTOR` · 7×7
              - **Vector 795** · `VECTOR` · 16×0
        - **Frame 1000003872** · `FRAME` · 104×24 · horizontal row, gap 16px · 3 children
          - **Mask group** · `GROUP` · 24×24 · 2 children
            - **Rectangle 6079** · `RECTANGLE` · 24×24
            - **share icon** · `GROUP` · 16×16 · 5 children
              - **Line 4** · `VECTOR` · 7×4
              - **Line 5** · `VECTOR` · 7×4
              - **Oval** · `ELLIPSE` · 5×5
              - **Oval Copy** · `ELLIPSE` · 5×5
              - **Oval Copy 2** · `ELLIPSE` · 5×5
          - **Mask group** · `GROUP` · 24×24 · 2 children
            - **Rectangle 6078** · `RECTANGLE` · 24×24
            - **Group 1000004283** · `GROUP` · 16×14 · 1 children
              - **Vector** · `VECTOR` · 16×14
          - **Mask group** · `GROUP` · 24×24 · 2 children
            - **Rectangle 6080** · `RECTANGLE` · 24×24
            - **Mask group** · `GROUP` · 16×15 · 1 children
              - **Group 1756** · `GROUP` · 16×15
                - _…and 1 more_
      - **Frame 1000003887** · `FRAME` · 584×208 · horizontal row, gap 8px · 2 children
        - **Frame 1000003885** · `FRAME` · 288×208 · vertical stack, gap 160px, padding 8px · 2 children
          - **Frame 1000003883** · `FRAME` · 154×16 · horizontal row, gap 4px · 3 children
            - **Seen** · `GROUP` · 34×16 · 1 children
              - **Frame 1000003874** · `FRAME` · 34×16 · horizontal row, gap 10px, padding 2/4/2/4px
                - _…and 1 more_
            - **Group 11 Copy 2** · `GROUP` · 62×16 · 2 children
              - **Group 1000003860** · `GROUP` · 62×16
                - _…and 1 more_
              - **Group 1685** · `GROUP` · 13×12
                - _…and 2 more_
            - **RERA** · `GROUP` · 50×16 · 1 children
              - **Frame 1000003879** · `FRAME` · 50×16 · vertical stack, gap 10px
                - _…and 1 more_
          - **Frame 1000003884** · `FRAME` · 272×16 · horizontal row, gap 229px · 2 children
            - **Image Number** · `GROUP` · 31×16 · 1 children
              - **Frame 1000003880** · `FRAME` · 31×16 · horizontal row, gap 10px, padding 2/4/2/4px
                - _…and 1 more_
            - **Hall** · `GROUP` · 28×16 · 1 children
              - **Frame 1000003881** · `FRAME` · 28×16 · horizontal row, gap 10px, padding 2/4/2/4px
                - _…and 1 more_
        - **Frame 1000003886** · `FRAME` · 288×208 · vertical stack, gap 160px, padding 8px
    - **Frame 1000003889** · `FRAME` · 390×16 · horizontal row, gap 2px · 7 children
      - **Sikka Karnam Greens,** · `TEXT` · 115×16 · “2 years old property”
      - **Dot Text Divider** · `GROUP` · 16×16 · 1 children
        - **Frame 1000003888** · `FRAME` · 16×16 · vertical stack, gap 10px, padding 6px · 1 children
          - **Oval** · `ELLIPSE` · 4×4
      - **Pay 10% now and rest** · `TEXT` · 85×16 · “Ready to move”
      - **Dot Text Divider** · `GROUP` · 16×16 · 1 children
        - **Frame 1000003888** · `FRAME` · 16×16 · vertical stack, gap 10px, padding 6px · 1 children
          - **Oval** · `ELLIPSE` · 4×4
      - **Sikka Karnam Greens,** · `TEXT` · 65×16 · “East facing”
      - **Dot Text Divider** · `GROUP` · 16×16 · 1 children
        - **Frame 1000003888** · `FRAME` · 16×16 · vertical stack, gap 10px, padding 6px · 1 children
          - **Oval** · `ELLIPSE` · 4×4
      - **Sikka Karnam Greens,** · `TEXT` · 65×16 · “East facing”
  - **Frame 1000003892** · `FRAME` · 360×60 · vertical stack, gap 4px, padding 0/24/0/24px · 2 children
    - **Frame 1000003897** · `FRAME` · 312×40 · horizontal row · 2 children
      - **Frame 1000003894** · `FRAME` · 100×40 · vertical stack, gap 4px · 2 children
        - **₹17 L - ₹1.6 Cr. (Al** · `TEXT` · 63×20 · “₹4.2 Cr”
        - **Config** · `GROUP` · 100×16 · 1 children
          - **Config** · `TEXT` · 100×16 · “2 BHK Apartment”
      - **Group 1000004295** · `GROUP` · 130×16 · 1 children
        - **Frame 1000003891** · `FRAME` · 130×16 · horizontal row · 2 children
          - **Sumeet Agrawal** · `TEXT` · 114×16 · “View price breakup”
          - **Right Cheveron** · `GROUP` · 16×16 · 2 children
            - **Rectangle 1050** · `RECTANGLE` · 16×16
            - **Group 1564** · `GROUP` · 8×8 · 2 children
              - **Rectangle 1051** · `RECTANGLE` · 8×8
              - **Shape** · `VECTOR` · 5×8
    - **Frame 1000003895** · `FRAME` · 303×16 · horizontal row, gap 2px · 3 children
      - **Frame 1000003896** · `FRAME` · 138×16 · horizontal row, gap 2px · 2 children
        - **₹35.4 L - ₹1.15 Cr** · `TEXT` · 76×16 · “Built-up area”
        - **₹35.4 L - ₹1.15 Cr** · `TEXT` · 60×16 · “1570 sq.ft.”
      - **Dot Text Divider** · `GROUP` · 16×16 · 1 children
        - **Frame 1000003888** · `FRAME` · 16×16 · vertical stack, gap 10px, padding 6px · 1 children
          - **Oval** · `ELLIPSE` · 4×4
      - **Group 1000004565** · `GROUP` · 145×16 · 2 children
        - **₹35.4 L - ₹1.15 Cr** · `TEXT` · 71×16 · “Carpet  area”
        - **₹35.4 L - ₹1.15 Cr** · `TEXT` · 72×16 · “1320 sq.ft.”
  - **Frame 1000003899** · `FRAME` · 360×36 · horizontal row, gap 8px, padding 0/24/0/24px · 2 children
    - **Frame 1000003898** · `FRAME` · 156×36 · vertical stack, gap 4px · 2 children
      - **₹17 L - ₹1.6 Cr. (Al** · `TEXT` · 156×16 · “Panchsheel Realty Towers”
      - **₹17 L - ₹1.6 Cr. (Al** · `TEXT` · 111×16 · “Vitthal Nagar, Pune”
    - **Group 1000004325** · `GROUP` · 105×32 · 1 children
      - **Group 1000003683** · `GROUP` · 105×32 · 1 children
        - **Group 1695** · `GROUP` · 105×32 · 1 children
          - **Group 1000003099** · `GROUP` · 105×32 · 1 children
            - **Frame 1000003901** · `FRAME` · 105×32 · vertical stack, gap 10px, padding 8px · 1 children
              - **Frame 1000003900** · `FRAME` · 89×16 · horizontal row, gap 4px
                - _…and 2 more_
  - **Frame 1000003906** · `FRAME` · 360×119 · vertical stack, gap 24px · 2 children
    - **Frame 1000003902** · `FRAME` · 360×27 · horizontal row, gap 24px · 1 children
      - **Frame 1000003903** · `FRAME` · 360×27 · horizontal row, gap 24px, padding 0/0/0/24px · 4 children
        - **Frame 1000003904** · `FRAME` · 64×27 · vertical stack, gap 8px · 2 children
          - **Overview** · `TEXT` · 64×16 · “Overview”
          - **Rectangle 4266** · `VECTOR` · 64×3
        - **Highlights** · `TEXT` · 67×16 · “Highlights”
        - **Property Tour** · `TEXT` · 89×16 · “Property Tour”
        - **Data Insights** · `TEXT` · 86×16 · “Data Insights”
    - **Frame 1000003910** · `FRAME` · 360×68 · vertical stack, gap 16px · 2 children
      - **Frame 1000003905** · `FRAME` · 241×16 · horizontal row, gap 10px, padding 0/24/0/24px · 1 children
        - **Project Specifications** · `TEXT` · 193×16 · “Project Specifications”
      - **Frame 1000003908** · `FRAME` · 380×36 · horizontal row, gap 12px · 5 children
        - **Frame 1000003907** · `FRAME` · 114×36 · vertical stack, gap 4px, padding 0/0/0/24px · 2 children
          - **₹35.4 L - ₹1.15 Cr** · `TEXT` · 90×16 · “Avg. rate/ sq.ft.”
          - **₹35.4 L - ₹1.15 Cr** · `TEXT` · 90×16 · “₹30k”
        - **Vector 100** · `VECTOR` · 0×36
        - **Frame 1000003908** · `FRAME` · 77×36 · vertical stack, gap 4px · 2 children
          - **₹35.4 L - ₹1.15 Cr** · `TEXT` · 64×16 · “Price trend”
          - **Frame 1000003909** · `FRAME` · 77×16 · horizontal row, gap 4px · 2 children
            - **Rectangle** · `VECTOR` · 9×9
            - **₹35.4 L - ₹1.15 Cr** · `TEXT` · 60×16 · “12.7% YOY”
        - **Vector 101** · `VECTOR` · 0×36
        - **Frame 1000003909** · `FRAME` · 141×36 · vertical stack, gap 4px · 2 children
          - **₹35.4 L - ₹1.15 Cr** · `TEXT` · 133×16 · “Built-up & Carpet  area”
          - **Frame 1000003909** · `FRAME` · 141×16 · horizontal row, gap 4px · 1 children
            - **₹35.4 L - ₹1.15 Cr** · `TEXT` · 141×16 · “1570 sq.ft. & 1320 sq.ft.”
  - **Frame 1000003911** · `FRAME` · 360×0 · vertical stack, gap 10px, padding 0/24/0/24px · 1 children
    - **Line Divider** · `VECTOR` · 312×0
  - **Frame 2087324551** · `FRAME` · 360×52 · horizontal row, gap 56px, padding 0/24/0/24px · 2 children
    - **Seller Details** · `GROUP` · 158×52 · 1 children
      - **Group 1000004292** · `GROUP` · 158×52 · 1 children
        - **Group 1000004296** · `GROUP` · 158×52 · 1 children
          - **Frame 2087324554** · `FRAME` · 158×52 · horizontal row, gap 8px · 2 children
            - **Mask group** · `GROUP` · 32×32 · 3 children
              - **Ellipse 11** · `ELLIPSE` · 32×32
              - **Ellipse 593** · `ELLIPSE` · 32×32
              - **Rectangle** · `RECTANGLE` · 36×36
            - **Group 1000004295** · `GROUP` · 118×52 · 1 children
              - **Group 1000004538** · `GROUP` · 118×52
                - _…and 1 more_
    - **Frame 2087324556** · `FRAME` · 98×52 · vertical stack, gap 4px · 2 children
      - **Free, fast & secure** · `TEXT` · 98×12 · “Free, fast & secure”
      - **Group 1000004323** · `GROUP` · 98×32 · 1 children
        - **Group 1000004322** · `GROUP` · 98×32 · 1 children
          - **Frame 2087324555** · `FRAME` · 98×32 · vertical stack, gap 10px, padding 8/20/8/20px · 1 children
            - **Group 1000004536** · `GROUP` · 58×16 · 1 children
              - **Chat now** · `TEXT` · 58×16 · “Chat now”
  - **Frame 2087324561** · `FRAME` · 360×160 · vertical stack, gap 10px, padding 24/24/8/24px · 1 children
    - **Frame 1000004647** · `FRAME` · 312×128 · vertical stack, gap 10px, padding 8px · 1 children
      - **Frame 2087324559** · `FRAME` · 296×112 · horizontal row, gap 8px · 2 children
        - **Mask group** · `GROUP` · 102×112 · 2 children
          - **Rectangle 4214** · `RECTANGLE` · 102×112
          - **976055506** · `RECTANGLE` · 177×172
        - **Frame 2087324560** · `FRAME` · 186×112 · vertical stack, gap 8px · 2 children
          - **Group 1000003659** · `GROUP` · 186×72 · 1 children
            - **Frame 2087324557** · `FRAME` · 186×72 · vertical stack, gap 4px · 3 children
              - **Sunil Apartment Home** · `TEXT` · 186×16 · “Sunil Apartment Housing”
              - **2,3,4 BHK Apartment** · `TEXT` · 186×32 · “3 BHK Apartment
N Lane, Sector 46, New Gurgaon”
              - **₹2.04 Cr. - ₹3.06 Cr** · `TEXT` · 186×16 · “₹2.04 Cr. - ₹3.06 Cr.”
          - **Group 1000004327** · `GROUP` · 186×32 · 1 children
            - **Frame 2087324558** · `FRAME` · 186×32 · vertical stack, gap 10px, padding 8/69/8/69px · 1 children
              - **Group 1759** · `GROUP` · 48×16
                - _…and 1 more_
  - **Frame 1000004579** · `FRAME` · 360×16 · horizontal row, padding 0/24/0/24px · 2 children
    - **Sumeet Agrawal** · `TEXT` · 201×16 · “Access zero brokerage properties”
    - **Right Cheveron** · `GROUP` · 16×16 · 2 children
      - **Rectangle 1050** · `RECTANGLE` · 16×16
      - **Group 1564** · `GROUP` · 8×8 · 2 children
        - **Rectangle 1051** · `RECTANGLE` · 8×8
        - **Shape** · `VECTOR` · 5×8
  - **Frame 2087324563** · `FRAME` · 360×156 · vertical stack, gap 10px, padding 24/24/8/24px · 1 children
    - **Frame 2087324566** · `FRAME` · 288×124 · vertical stack, gap 16px · 2 children
      - **Why Emaar Digi Homes** · `TEXT` · 288×16 · “About the property”
      - **Frame 2087324565** · `FRAME` · 288×92 · vertical stack, gap 8px · 2 children
        - **Frame 2087324567** · `FRAME` · 288×68 · vertical stack, gap 4px · 3 children
          - **One of the best prop** · `TEXT` · 288×20 · “Eco-friendly environment”
          - **One of the best prop** · `TEXT` · 288×20 · “Spacious clubhouse”
          - **One of the best prop** · `TEXT` · 288×20 · “Remote working office setup”
        - **Frame 2087324564** · `FRAME` · 76×16 · horizontal row, gap 2px · 2 children
          - **Golf Course Extensio** · `TEXT` · 62×16 · “Read more”
          - **Right Cheveron** · `GROUP` · 12×12 · 2 children
            - **Rectangle 1050** · `RECTANGLE` · 12×12
            - **Group 1564** · `GROUP` · 8×8 · 2 children
              - **Rectangle 1051** · `RECTANGLE` · 8×8
              - **Shape** · `VECTOR` · 5×8
  - **Frame 2087324564** · `FRAME` · 360×0 · vertical stack, gap 10px, padding 0/24/0/24px · 1 children
    - **Line Divider** · `VECTOR` · 312×0
  - **Frame 2087324568** · `FRAME` · 360×248 · vertical stack, gap 24px, padding 10/24/10/24px · 2 children
    - **Frame 2087324578** · `FRAME` · 312×172 · vertical stack, gap 16px · 2 children
      - **Golf Course Extensio** · `TEXT` · 105×16 · “Additional details”
      - **Frame 2087324577** · `FRAME` · 312×140 · vertical stack, gap 16px · 3 children
        - **Frame 2087324570** · `FRAME` · 312×36 · horizontal row, gap 16px · 2 children
          - **Frame 2087324569** · `FRAME` · 148×36 · vertical stack, gap 4px · 2 children
            - **₹35.4 L - ₹1.15 Cr** · `TEXT` · 148×16 · “Bedrooms”
            - **₹35.4 L - ₹1.15 Cr** · `TEXT` · 148×16 · “3”
          - **Frame 2087324571** · `FRAME` · 148×36 · vertical stack, gap 4px · 2 children
            - **₹35.4 L - ₹1.15 Cr** · `TEXT` · 148×16 · “Balcony”
            - **₹35.4 L - ₹1.15 Cr** · `TEXT` · 148×16 · “5”
        - **Frame 2087324571** · `FRAME` · 312×36 · horizontal row, gap 16px · 2 children
          - **Frame 2087324569** · `FRAME` · 148×36 · vertical stack, gap 4px · 2 children
            - **₹35.4 L - ₹1.15 Cr** · `TEXT` · 148×16 · “Furnishing”
            - **₹35.4 L - ₹1.15 Cr** · `TEXT` · 148×16 · “Fully furnished”
          - **Frame 2087324571** · `FRAME` · 148×36 · vertical stack, gap 4px · 2 children
            - **₹35.4 L - ₹1.15 Cr** · `TEXT` · 148×16 · “Parking”
            - **₹35.4 L - ₹1.15 Cr** · `TEXT` · 148×16 · “1 Open, 2 Closed”
        - **Frame 2087324572** · `FRAME` · 312×36 · horizontal row, gap 16px · 2 children
          - **Frame 2087324569** · `FRAME` · 148×36 · vertical stack, gap 4px · 2 children
            - **₹35.4 L - ₹1.15 Cr** · `TEXT` · 148×16 · “Floor number”
            - **₹35.4 L - ₹1.15 Cr** · `TEXT` · 148×16 · “18 out of 32”
          - **Frame 2087324571** · `FRAME` · 148×36 · vertical stack, gap 4px · 2 children
            - **₹35.4 L - ₹1.15 Cr** · `TEXT` · 148×16 · “Ownership”
            - **₹35.4 L - ₹1.15 Cr** · `TEXT` · 148×16 · “Leased”
    - **Group CTAs** · `GROUP` · 312×32 · 1 children
      - **Frame 2087324576** · `FRAME` · 312×32 · horizontal row, gap 8px · 3 children
        - **Group 1000004323** · `GROUP` · 32×32 · 1 children
          - **Group 1000004320** · `GROUP` · 32×32 · 1 children
            - **Frame 2087324573** · `FRAME` · 32×32 · horizontal row, gap 10px, padding 7/8/7/8px · 1 children
              - **Mask group** · `GROUP` · 16×16
                - _…and 2 more_
        - **Group 1000004322** · `GROUP` · 32×32 · 1 children
          - **Frame 2087324574** · `FRAME` · 32×32 · horizontal row, gap 10px, padding 8px · 1 children
            - **Mask group** · `GROUP` · 16×16 · 2 children
              - **Rectangle 6078** · `RECTANGLE` · 16×16
              - **Group 1000004283** · `GROUP` · 16×14
                - _…and 1 more_
        - **Group 1000004318** · `GROUP` · 232×32 · 1 children
          - **Frame 2087324575** · `FRAME` · 232×32 · horizontal row, gap 10px, padding 8/56/8/56px · 1 children
            - **Ask for more details** · `TEXT` · 119×16 · “Ask for more details”
  - **Frame 2087324569** · `FRAME` · 360×308 · vertical stack, gap 10px, padding 24/24/8/24px · 1 children
    - **Frame 2087324566** · `FRAME` · 312×276 · vertical stack, gap 16px · 2 children
      - **Why Emaar Digi Homes** · `TEXT` · 312×16 · “Check availability & more information”
      - **Frame 2087324581** · `FRAME` · 312×244 · vertical stack, gap 8px, padding 8px · 2 children
        - **Frame 2087324589** · `FRAME` · 296×180 · vertical stack, gap 16px · 2 children
          - **Frame 2087324582** · `FRAME` · 296×148 · vertical stack, gap 16px · 4 children
            - **Group 1974** · `GROUP` · 280×16 · 1 children
              - **Group 1973** · `GROUP` · 280×16
                - _…and 1 more_
            - **Frame 2087324580** · `FRAME` · 118×44 · horizontal row, gap 8px · 2 children
              - **Group 1000004455** · `GROUP` · 32×32
                - _…and 1 more_
              - **Group 1000004515** · `GROUP` · 78×44
                - _…and 1 more_
            - **Vector 880** · `VECTOR` · 296×0
            - **Frame 2087324586** · `FRAME` · 296×40 · vertical stack, gap 8px · 2 children
              - **Frame 2087324584** · `FRAME` · 280×16 · horizontal row, gap 8px
                - _…and 2 more_
              - **Frame 2087324585** · `FRAME` · 280×16 · horizontal row, gap 8px
                - _…and 2 more_
          - **Group 1720** · `GROUP` · 253×16 · 1 children
            - **Frame 2087324587** · `FRAME` · 253×16 · horizontal row, gap 8px · 2 children
              - **Perfect/ Great** · `GROUP` · 17×16
                - _…and 2 more_
              - **156 people are looki** · `TEXT` · 228×16 · “Perfect Choice! Users like you also liked this”
        - **Frame 2087324588** · `FRAME` · 296×40 · horizontal row, gap 10px, padding 12/65/12/65px · 1 children
          - **View 409 Properties** · `TEXT` · 166×16 · “Check availibility with seller”
  - **Frame 2087324570** · `FRAME` · 360×406 · vertical stack, gap 10px, padding 24/24/8/24px · 1 children
    - **Frame 2087324566** · `FRAME` · 312×374 · vertical stack, gap 16px · 2 children
      - **Frame 2087324590** · `FRAME` · 312×16 · horizontal row, gap 27px · 2 children
        - **Golf Course Extensio** · `TEXT` · 246×16 · “Buyers like you are also interested in”
        - **Group 1000004345** · `GROUP` · 39×16 · 1 children
          - **See all** · `TEXT` · 39×16 · “See all”
      - **Frame 2087324606** · `FRAME` · 336×342 · horizontal row, gap 12px · 3 children
        - **Frame 2087324594** · `FRAME` · 228×342 · vertical stack, gap 16px, padding 8px · 3 children
          - **Frame 2087324604** · `FRAME` · 212×203 · vertical stack, gap 8px · 2 children
            - **Frame 2087324593** · `FRAME` · 212×135 · horizontal row, gap 134px, padding 8px · 2 children
              - **RERA** · `GROUP` · 50×16
                - _…and 1 more_
              - **Mask group** · `GROUP` · 24×24
                - _…and 2 more_
            - **Frame 2087324598** · `FRAME` · 184×60 · vertical stack, gap 8px · 2 children
              - **Frame 2087324596** · `FRAME` · 138×16 · horizontal row, gap 4px
                - _…and 3 more_
              - **Frame 2087324597** · `FRAME` · 184×36 · vertical stack, gap 4px
                - _…and 2 more_
          - **Frame 2087324605** · `FRAME` · 212×59 · vertical stack, gap 8px · 2 children
            - **Frame 2087324599** · `FRAME` · 184×35 · vertical stack, gap 3px · 2 children
              - **₹3.79 Cr - ₹14.72 Cr** · `TEXT` · 184×16 · “DLF The Belaire”
              - **mktd by Godrej Realt** · `TEXT` · 184×16 · “Sadhu Vaswani Road, East Kharadi, Pune”
            - **Frame 2087324600** · `FRAME` · 212×16 · horizontal row, gap 24px · 3 children
              - **mktd by Godrej Realt** · `TEXT` · 102×16 · “1438 - 1500 sq.ft. ”
              - **Frame 2087324595** · `FRAME` · 12×12 · horizontal row, gap 10px, padding 4px
                - _…and 1 more_
              - **mktd by Godrej Realt** · `TEXT` · 86×16 · “₹29.29K/ sq.ft.”
          - **Frame 2087324603** · `FRAME` · 212×32 · horizontal row, gap 8px · 2 children
            - **Group 1000004358** · `GROUP` · 32×32 · 1 children
              - **Frame 2087324601** · `FRAME` · 32×32 · horizontal row, gap 10px, padding 8px
                - _…and 1 more_
            - **Frame 2087324602** · `FRAME` · 172×32 · vertical stack, gap 10px, padding 8/51/8/51px · 1 children
              - **Group 1759** · `GROUP` · 70×16
                - _…and 1 more_
        - **Frame 2087324595** · `FRAME` · 228×342 · vertical stack, gap 16px, padding 8px · 3 children
          - **Frame 2087324604** · `FRAME` · 212×203 · vertical stack, gap 8px · 2 children
            - **Frame 2087324593** · `FRAME` · 212×135 · horizontal row, gap 134px, padding 8px · 2 children
              - **RERA** · `GROUP` · 50×16
                - _…and 1 more_
              - **Mask group** · `GROUP` · 24×24
                - _…and 2 more_
            - **Frame 2087324598** · `FRAME` · 184×60 · vertical stack, gap 8px · 2 children
              - **Frame 2087324596** · `FRAME` · 138×16 · horizontal row, gap 4px
                - _…and 3 more_
              - **Frame 2087324597** · `FRAME` · 184×36 · vertical stack, gap 4px
                - _…and 2 more_
          - **Frame 2087324605** · `FRAME` · 212×59 · vertical stack, gap 8px · 2 children
            - **Frame 2087324599** · `FRAME` · 184×35 · vertical stack, gap 3px · 2 children
              - **₹3.79 Cr - ₹14.72 Cr** · `TEXT` · 184×16 · “DLF The Belaire”
              - **mktd by Godrej Realt** · `TEXT` · 184×16 · “Sadhu Vaswani Road, East Kharadi, Pune”
            - **Frame 2087324600** · `FRAME` · 212×16 · horizontal row, gap 24px · 3 children
              - **mktd by Godrej Realt** · `TEXT` · 102×16 · “1438 - 1500 sq.ft. ”
              - **Frame 2087324595** · `FRAME` · 12×12 · horizontal row, gap 10px, padding 4px
                - _…and 1 more_
              - **mktd by Godrej Realt** · `TEXT` · 86×16 · “₹29.29K/ sq.ft.”
          - **Frame 2087324603** · `FRAME` · 212×32 · horizontal row, gap 8px · 2 children
            - **Group 1000004358** · `GROUP` · 32×32 · 1 children
              - **Frame 2087324601** · `FRAME` · 32×32 · horizontal row, gap 10px, padding 8px
                - _…and 1 more_
            - **Frame 2087324602** · `FRAME` · 172×32 · vertical stack, gap 10px, padding 8/51/8/51px · 1 children
              - **Group 1759** · `GROUP` · 70×16
                - _…and 1 more_
        - **Frame 2087324596** · `FRAME` · 228×342 · vertical stack, gap 16px, padding 8px · 3 children
          - **Frame 2087324604** · `FRAME` · 212×203 · vertical stack, gap 8px · 2 children
            - **Frame 2087324593** · `FRAME` · 212×135 · horizontal row, gap 134px, padding 8px · 2 children
              - **RERA** · `GROUP` · 50×16
                - _…and 1 more_
              - **Mask group** · `GROUP` · 24×24
                - _…and 2 more_
            - **Frame 2087324598** · `FRAME` · 184×60 · vertical stack, gap 8px · 2 children
              - **Frame 2087324596** · `FRAME` · 138×16 · horizontal row, gap 4px
                - _…and 3 more_
              - **Frame 2087324597** · `FRAME` · 184×36 · vertical stack, gap 4px
                - _…and 2 more_
          - **Frame 2087324605** · `FRAME` · 212×59 · vertical stack, gap 8px · 2 children
            - **Frame 2087324599** · `FRAME` · 184×35 · vertical stack, gap 3px · 2 children
              - **₹3.79 Cr - ₹14.72 Cr** · `TEXT` · 184×16 · “DLF The Belaire”
              - **mktd by Godrej Realt** · `TEXT` · 184×16 · “Sadhu Vaswani Road, East Kharadi, Pune”
            - **Frame 2087324600** · `FRAME` · 212×16 · horizontal row, gap 24px · 3 children
              - **mktd by Godrej Realt** · `TEXT` · 102×16 · “1438 - 1500 sq.ft. ”
              - **Frame 2087324595** · `FRAME` · 12×12 · horizontal row, gap 10px, padding 4px
                - _…and 1 more_
              - **mktd by Godrej Realt** · `TEXT` · 86×16 · “₹29.29K/ sq.ft.”
          - **Frame 2087324603** · `FRAME` · 212×32 · horizontal row, gap 8px · 2 children
            - **Group 1000004358** · `GROUP` · 32×32 · 1 children
              - **Frame 2087324601** · `FRAME` · 32×32 · horizontal row, gap 10px, padding 8px
                - _…and 1 more_
            - **Frame 2087324602** · `FRAME` · 172×32 · vertical stack, gap 10px, padding 8/51/8/51px · 1 children
              - **Group 1759** · `GROUP` · 70×16
                - _…and 1 more_
  - **Frame 2087324571** · `FRAME` · 360×0 · vertical stack, gap 10px, padding 0/24/0/24px · 1 children
    - **Line Divider** · `VECTOR` · 312×0
  - **Frame 1000003676** · `FRAME` · 352×88 · vertical stack, gap 10px, padding 0/24/0/24px · 1 children
    - **Group 1000002637** · `GROUP` · 304×88 · 1 children
      - **Frame 2087324609** · `FRAME` · 304×88 · vertical stack, gap 16px · 2 children
        - **Frame 2087324607** · `FRAME` · 304×40 · horizontal row, gap 12px · 2 children
          - **Group 1000003687** · `GROUP` · 40×40 · 2 children
            - **Ellipse 592** · `ELLIPSE` · 40×40
            - **Mask group** · `GROUP` · 40×40 · 2 children
              - **Ellipse 593** · `ELLIPSE` · 40×40
              - **Group 1000003686** · `GROUP` · 52×35
                - _…and 4 more_
          - **Personalise your home search journey with 3 quick answers !** · `TEXT` · 240×40 · “Personalise your home search journey with 3 quick answers !”
        - **Group 9063** · `GROUP` · 296×32 · 1 children
          - **Frame 2087324608** · `FRAME` · 296×32 · horizontal row, gap 10px, padding 8/115/8/115px · 1 children
            - **Let’s begin** · `TEXT` · 65×16 · “Let’s begin”

### Property recommendation on PDP gallery- option 2

Page: PDP  · 3 variants

Reuse: import existing — key `578c15a83ca180ecb912c2c1c8dc15313d17d253` · node `2437:1217`

| Property | Values |
|---|---|
| Property 1 | Double card, Single card, no image |

Sample variant structure:

- **Property 1=Double card** · `COMPONENT` · 158×184 · vertical stack, gap 8px · 1 children
  - **Frame 1000003691** · `FRAME` · 158×74 · vertical stack, gap 5px, padding 8px · 3 children
    - **Frame 2087324449** · `FRAME` · 142×16 · vertical stack, gap 4px · 1 children
      - **Location** · `TEXT` · 142×16 · “Serene Residences”
    - **Location** · `TEXT` · 142×16 · “Near Chandan Nagar...”
    - **Frame 2087324450** · `FRAME` · 142×16 · vertical stack, gap 8px · 1 children
      - **₹5.15 Cr - ₹9.87 Cr** · `TEXT` · 142×16 · “₹5.15 Cr - ₹9.87 Cr”

### RERA

Page: PDP  · 2 variants

Reuse: import existing — key `072959374b90c62fd190cb56c79d23c6e8674856` · node `2288:6868`

| Property | Values |
|---|---|
| Property 1 | Expanded, collapsed |

Sample variant structure:

- **Property 1=Expanded** · `COMPONENT` · 360×536 · vertical stack · 2 children
  - **Frame 2087324894** · `FRAME` · 360×48 · horizontal row, gap 10px, padding 16/16/12/16px · 2 children
    - **Housing.com is a listings and information platform** · `TEXT` · 298×20 · “Before you proceed”
    - **Component 15** · `INSTANCE` · 20×20 · instance of Component 15
  - **Frame 2087324893** · `FRAME` · 360×488 · vertical stack, gap 12px, padding 0/16/24/16px · 2 children
    - **Housing.com is a listings and information platform** · `TEXT` · 328×404 · “Housing.com provides information only. Verify details independently.
Housing.com”
    - **button** · `INSTANCE` · 328×48 · horizontal row · instance of button

### Property recommendation on PDP gallery - option 1

Page: PDP  · 1 variants

Reuse: import existing — key `bc0976b76b4630499ff56fade3e2ad483de4b820` · node `2410:747`

| Property | Values |
|---|---|
| Property 1 | Default |

Sample variant structure:

- **Property 1=Default** · `COMPONENT` · 328×81 · vertical stack · 1 children
  - **Frame 2087324967** · `INSTANCE` · 328×81 · vertical stack, gap 12px · instance of Frame 2087324967

### book site visit

Page: PDP  · 2 variants

Reuse: import existing — key `eca49ee93c9c3716613cb64409d0fbc8087554bd` · node `2824:993`

| Property | Values |
|---|---|
| Property 1 | single seller, multiple seller |

Sample variant structure:

- **Property 1=single seller** · `COMPONENT` · 361×422 · 5 children
  - **Frame 2087324970** · `FRAME` · 360×422 · horizontal row · 1 children
    - **Hero image** · `RECTANGLE` · 360×422
  - **Frame 2087324968** · `FRAME` · 360×422 · vertical stack, gap 10px, padding 10/16/24/16px
  - **Frame 2087324986** · `FRAME` · 144×32 · horizontal row, gap 4px, padding 8/16/8/8px · 2 children
    - **View photo gallery** · `TEXT` · 111×16 · “View photo gallery”
    - **Shape** · `VECTOR` · 5×8
  - **Top panel** · `FRAME` · 360×68 · horizontal row, gap 11px · 1 children
    - **Top panel** · `INSTANCE` · 328×32 · horizontal row, gap 11px · instance of Top panel
  - **Frame 2087324937** · `FRAME` · 328×178 · vertical stack, gap 16px, padding 16/0/0/0px · 3 children
    - **Frame 2087324971** · `FRAME` · 328×40 · horizontal row, gap 16px · 1 children
      - **title** · `TEXT` · 218×40 · “You’ve seen the details.
Now experience it in person.”
    - **Frame 2087324979** · `FRAME` · 328×24 · horizontal row, gap 4px · 2 children
      - **Frame 2087324982** · `FRAME` · 66×24 · horizontal row, gap -3px · 3 children
        - **Frame 2087324981** · `FRAME` · 24×24 · horizontal row · 1 children
          - **JM** · `TEXT` · 13×12 · “JM”
        - **Frame 2087324984** · `FRAME` · 24×24 · horizontal row · 1 children
          - **KL** · `TEXT` · 11×12 · “KL”
        - **Frame 2087324983** · `FRAME` · 24×24 · horizontal row · 1 children
          - **GM** · `TEXT` · 14×12 · “GM”
      - **title** · `TEXT` · 189×16 · “+6 others viewed this last month”
    - **Seller detail** · `FRAME` · 328×66 · vertical stack, gap 8px, padding 16px · 1 children
      - **Frame 2087324987** · `FRAME` · 296×34 · horizontal row · 2 children
        - **Frame 2087324553** · `FRAME` · 154×34 · horizontal row, gap 8px · 2 children
          - **Frame 2087324982** · `FRAME` · 32×32 · horizontal row
          - **Frame 2087324985** · `FRAME` · 114×34 · vertical stack, gap 2px · 2 children
            - **Frame 2087324706** · `FRAME` · 114×16 · horizontal row, gap 4px
              - _…and 1 more_
            - **Seller** · `TEXT` · 33×16 · “Seller”
        - **Frame 2087324727** · `FRAME` · 146×32 · horizontal row, gap 4px, padding 0/16/0/16px · 2 children
          - **Call** · `INSTANCE` · 16×16 · instance of Call
          - **Book site visit** · `TEXT` · 94×16 · “Book site visit”

### Bottom bar

Page: PDP  · 2 variants

Reuse: import existing — key `50d869ff647ebca3c4d533251c8bab4000faf411` · node `2288:6855`

| Property | Values |
|---|---|
| category | NP, Rent - VIP |

Sample variant structure:

- **category=NP** · `COMPONENT` · 360×66 · horizontal row, gap 8px, padding 16/16/14/16px · 3 children
  - **Frame 1000004649** · `FRAME` · 73×37 · horizontal row, gap 4px, padding 10/9/11/12px · 2 children
    - **Mask group** · `GROUP` · 15×15 · 2 children
      - **Rectangle 1086** · `RECTANGLE` · 15×15
      - **WhatsApp_Logo_1** · `RECTANGLE` · 15×15
    - **Chat** · `TEXT` · 33×16 · “Chat”
  - **Frame 1000004648** · `FRAME` · 102×37 · horizontal row, gap 10px, padding 10/8/11/8px · 1 children
    - **View Phone** · `TEXT` · 79×16 · “View Phone”
  - **Frame 1297** · `FRAME` · 137×37 · horizontal row, gap 10px, padding 10/24/12/24px · 1 children
    - **Text** · `TEXT` · 99×15 · “Contact Seller”

### Info strip

Page: PDP  · 1 variants

Reuse: import existing — key `0078221bed933143eb4ac8697b6c8dae9636ba25` · node `3316:7841`

| Property | Values |
|---|---|
| Type | Rent - VIP |

Sample variant structure:

- **Type=Rent - VIP** · `COMPONENT` · 328×36 · horizontal row, gap 8px, padding 8/16/8/16px · 2 children
  - **Frame 2087330159** · `FRAME` · 34×20 · horizontal row, gap -2.000000238418579px · 2 children
    - **Vector** · `VECTOR` · 16×20
    - **Ellipse 586** · `ELLIPSE` · 20×20
  - **21 people have shortlisted this property** · `TEXT` · 229×16 · “21 people have shortlisted this property”

### Component 17

Page: PDP  · 2 variants

Reuse: import existing — key `d7fe6436b5570cdcbbca3437447d4a1d356672a7` · node `3422:4604`

| Property | Values |
|---|---|
| Property 1 | Active, Default |

Sample variant structure:

- **Property 1=Default** · `COMPONENT` · 42×42 · horizontal row, gap 10px, padding 12px · 1 children
  - **Frame 2087324448** · `FRAME` · 18×18 · horizontal row, gap 4px · 1 children
    - **Heart** · `INSTANCE` · 18×18 · instance of Heart

### Compare search

Page: PDP  · 2 variants

Reuse: import existing — key `775bf71183403be8ce4a2db28e2149ac1a66eebc` · node `3470:12123`

| Property | Values |
|---|---|
| Property 1 | Compare search (Closed), Compare search (Open) |

Sample variant structure:

- **Property 1=Compare search (Closed)** · `COMPONENT` · 971×48 · horizontal row, padding 12/16/12/16px · 1 children
  - **Frame 2087324384** · `FRAME` · 939×20 · horizontal row, gap 8px · 2 children
    - **MagnifyingGlass** · `INSTANCE` · 20×20 · instance of MagnifyingGlass
    - **Component 12** · `FRAME` · 911×20 · horizontal row, gap 3.034851551055908px · 1 children
      - **Search to add properties** · `TEXT` · 166×16 · “Search to add properties”

### Cards

Page: PDP  · 2 variants

Reuse: import existing — key `970aa6056c837da38345794feb8496c66a46d7a6` · node `3754:5120`

| Property | Values |
|---|---|
| Property 1 | Default, No image |

Sample variant structure:

- **Property 1=Default** · `COMPONENT` · 280×588 · vertical stack, gap 16px, padding 0/0/16/0px · 2 children
  - **Frame 2147261384** · `FRAME` · 280×160 · vertical stack, gap 10px · 2 children
    - **Rectangle 6151** · `RECTANGLE` · 280×160
    - **Frame 2087324447** · `FRAME` · 40×40 · horizontal row, gap 10px, padding 12px · 1 children
      - **Heart** · `INSTANCE` · 16×16 · instance of Heart
  - **Frame 2147261470** · `FRAME` · 280×396 · vertical stack, gap 24px · 2 children
    - **Frame 2087323803** · `FRAME` · 280×324 · vertical stack, gap 16px, padding 0/16/0/16px · 2 children
      - **Frame 2147261410** · `FRAME` · 221×24 · horizontal row, gap 8px · 2 children
        - **badge/base** · `FRAME` · 49×24 · vertical stack, gap 10px, padding 4/8/4/8px · 1 children
          - **RERA** · `TEXT` · 33×16 · “RERA”
        - **badge/base** · `FRAME` · 164×24 · vertical stack, gap 10px, padding 4/8/4/8px · 1 children
          - **Possession by Dec, 2026** · `TEXT` · 148×16 · “Possession by Dec, 2026”
      - **Frame 2087323809** · `FRAME` · 248×284 · vertical stack, gap 24px · 2 children
        - **Frame 2147261469** · `FRAME` · 248×46 · vertical stack, gap 8px · 2 children
          - **Frame 2147261408** · `FRAME` · 248×22 · vertical stack, gap 4px · 1 children
            - **Shapoorji Joyville** · `TEXT` · 138×22 · “Shapoorji Joyville”
          - **Frame 2087323813** · `FRAME` · 248×16 · horizontal row, gap 4px · 1 children
            - **Mundhwa Road, East Pune** · `TEXT` · 157×16 · “Mundhwa Road, East Pune”
        - **Frame 2147261468** · `FRAME` · 248×214 · vertical stack, gap 10px · 1 children
          - **Frame 2147261413** · `FRAME` · 248×214 · vertical stack, gap 16px · 5 children
            - **Frame 2147261439** · `FRAME` · 95×50 · vertical stack, gap 8px
              - _…and 2 more_
            - **Line 3** · `LINE` · 248×0
            - **Frame 2147261440** · `FRAME` · 127×50 · vertical stack, gap 8px
              - _…and 2 more_
            - **Line 4** · `LINE` · 248×0
            - **Frame 2147261442** · `FRAME` · 116×50 · vertical stack, gap 8px
              - _…and 2 more_
    - **Frame 2087324819** · `FRAME` · 280×48 · horizontal row, gap 8px, padding 0/16/0/16px · 1 children
      - **Button** · `INSTANCE` · 248×48 · horizontal row, gap 8px, padding 12/20/12/20px · instance of Button

### First fold

Page: PDP  · 4 variants

Reuse: import existing — key `151e45754e61843b5c91696923d49ad891300674` · node `3767:5698`

| Property | Values |
|---|---|
| Property 1 | Full view, Single image, Videos, 3D tour |

Sample variant structure:

- **Property 1=Full view** · `COMPONENT` · 1200×566 · horizontal row, gap 40px, padding 24px · 1 children
  - **Frame 2087324463** · `FRAME` · 1152×518 · vertical stack, gap 28px · 2 children
    - **Frame 2147261540** · `FRAME` · 1152×66 · horizontal row, gap 24px · 2 children
      - **Frame 2147261429** · `FRAME` · 1028×66 · vertical stack, gap 8px · 2 children
        - **Frame 2087324455** · `FRAME` · 1028×36 · vertical stack, gap 16px · 1 children
          - **Frame 2087324471** · `FRAME` · 1028×36 · horizontal row, gap 16px · 1 children
            - **Emaar MGF The Palm Drive** · `TEXT` · 1028×36 · “Emaar MGF The Palm Drive”
        - **Frame 2147261430** · `FRAME` · 479×22 · horizontal row, gap 8px · 5 children
          - **Frame 2087324408** · `FRAME` · 145×22 · horizontal row, gap 12px · 1 children
            - **Sector 66, Gurgaon** · `TEXT` · 145×22 · “Sector 66, Gurgaon”
          - **Line 4** · `LINE` · 22×0
          - **By EMAAR INDIA** · `TEXT` · 123×22 · “By EMAAR INDIA”
          - **Line 5** · `LINE` · 22×0
          - **Frame 2087324409** · `FRAME` · 179×22 · horizontal row, gap 12px · 1 children
            - **Updated on: Jun 2, 2026** · `TEXT` · 179×22 · “Updated on: Jun 2, 2026”
      - **Share and save** · `INSTANCE` · 100×42 · horizontal row, gap 16px · instance of Share and save
    - **Frame 2147261529** · `FRAME` · 1152×424 · horizontal row, gap 24px · 2 children
      - **Frame 1** · `FRAME` · 666×424 · vertical stack, gap 8px · 2 children
        - **Frame 2147261596** · `FRAME` · 666×208 · horizontal row, gap 8px · 2 children
          - **Rectangle 1** · `RECTANGLE` · 329×208
          - **Rectangle 2** · `RECTANGLE` · 329×208
        - **Frame 2087324476** · `FRAME` · 666×208 · horizontal row, gap 8px · 1 children
          - **Frame 5** · `FRAME` · 666×208 · horizontal row, gap 8px · 3 children
            - **Rectangle 2** · `RECTANGLE` · 329×208
            - **Rectangle 3** · `RECTANGLE` · 329×208
            - **Frame 2087324449** · `FRAME` · 93×42 · horizontal row, gap 10px, padding 12px
              - _…and 1 more_
      - **Frame 2147261423** · `FRAME` · 462×424 · horizontal row · 1 children
        - **Frame 2087324455** · `FRAME` · 462×424 · vertical stack, gap 24px · 5 children
          - **Frame 2147261542** · `FRAME` · 462×28 · horizontal row · 1 children
            - **Frame 2147261410** · `FRAME` · 383×28 · horizontal row, gap 12px
              - _…and 4 more_
          - **Frame 2147261434** · `FRAME` · 462×188 · vertical stack, gap 24px · 2 children
            - **Frame 2147261432** · `FRAME` · 462×82 · horizontal row, gap 24px
              - _…and 2 more_
            - **Frame 2147261433** · `FRAME` · 462×82 · horizontal row, gap 24px
              - _…and 2 more_
          - **Line 1** · `LINE` · 462×0
          - **Frame 2087324459** · `FRAME` · 252×64 · vertical stack, gap 8px · 2 children
            - **Placeholder** · `TEXT` · 35×20 · “Price”
            - **Frame 2147261413** · `FRAME` · 252×36 · horizontal row, gap 8px
              - _…and 2 more_
          - **Button** · `INSTANCE` · 462×48 · horizontal row, gap 8px, padding 12/20/12/20px · instance of Button

### Share

Page: PDP  · 2 variants

Reuse: import existing — key `691f993b303de537a33337046dd3deb06af203b6` · node `3772:13859`

| Property | Values |
|---|---|
| Property 1 | Default, success |

Sample variant structure:

- **Property 1=Default** · `COMPONENT` · 600×570 · vertical stack · 3 children
  - **Frame 2087324429** · `FRAME` · 600×70 · vertical stack, padding 24px · 1 children
    - **Frame 2087324431** · `FRAME` · 552×22 · horizontal row, gap 18.209110260009766px · 2 children
      - **Ask a question** · `TEXT` · 111×22 · “Ask a question”
      - **X** · `INSTANCE` · 20×20 · instance of X
  - **Line 2** · `LINE` · 600×0
  - **Frame 2087324430** · `FRAME` · 600×500 · vertical stack, gap 24px, padding 24px · 5 children
    - **Frame 2147261626** · `FRAME` · 552×20 · horizontal row · 1 children
      - **What is it about?** · `TEXT` · 114×20 · “What is it about?”
    - **Frame 2147261625** · `FRAME` · 552×88 · horizontal row, gap 16px · 7 children
      - **Other cities** · `INSTANCE` · 66×36 · horizontal row, gap 7.587128639221191px, padding 8/16/8/16px · instance of Other cities
      - **Other cities** · `INSTANCE` · 90×36 · horizontal row, gap 7.587128639221191px, padding 8/16/8/16px · instance of Other cities
      - **Other cities** · `INSTANCE` · 136×36 · horizontal row, gap 7.587128639221191px, padding 8/16/8/16px · instance of Other cities
      - **Other cities** · `INSTANCE` · 99×36 · horizontal row, gap 7.587128639221191px, padding 8/16/8/16px · instance of Other cities
      - **Other cities** · `INSTANCE` · 111×36 · horizontal row, gap 7.587128639221191px, padding 8/16/8/16px · instance of Other cities
      - **Other cities** · `INSTANCE` · 106×36 · horizontal row, gap 7.587128639221191px, padding 8/16/8/16px · instance of Other cities
      - **Other cities** · `INSTANCE` · 125×36 · horizontal row, gap 7.587128639221191px, padding 8/16/8/16px · instance of Other cities
    - **Frame 2087324431** · `FRAME` · 552×20 · horizontal row · 1 children
      - **What’s your question?** · `TEXT` · 151×20 · “What’s your question?”
    - **Compare search** · `FRAME` · 552×180 · horizontal row, padding 12/16/12/16px · 1 children
      - **Frame 2087324384** · `FRAME` · 520×20 · horizontal row, gap 8px · 1 children
        - **Component 12** · `FRAME` · 520×20 · horizontal row, gap 3.034851551055908px · 1 children
          - **Type your question here...** · `TEXT` · 172×20 · “Type your question here...”
    - **Frame 2147261603** · `FRAME` · 130×48 · horizontal row, gap 24px · 1 children
      - **Button** · `INSTANCE` · 130×48 · horizontal row, gap 8px, padding 12/20/12/20px · instance of Button

### Rating and review

Page: PDP  · 2 variants

Reuse: import existing — key `37d8eb086f30f20b4d90d5049a4a0fc851cc5d42` · node `3778:14224`

| Property | Values |
|---|---|
| Property 1 | default, new rating |

Sample variant structure:

- **Property 1=default** · `COMPONENT` · 792×640 · vertical stack, gap 24px, padding 24px · 2 children
  - **Frame 2147261467** · `FRAME` · 744×26 · horizontal row · 1 children
    - **Frame 2147261417** · `FRAME` · 170×26 · horizontal row, gap 10px · 1 children
      - **Ratings and reviews** · `TEXT` · 170×26 · “Ratings and reviews”
  - **Frame 2147261487** · `FRAME` · 744×542 · vertical stack, gap 24px, padding 24/16/16/16px · 2 children
    - **Frame 2147261512** · `FRAME` · 712×220 · vertical stack, gap 24px · 2 children
      - **Frame 2147261488** · `FRAME` · 712×72 · vertical stack, gap 12px · 2 children
        - **Frame 2147261486** · `FRAME` · 712×40 · horizontal row, gap 4px · 2 children
          - **Star** · `INSTANCE` · 32×32 · instance of Star
          - **4.3** · `TEXT` · 46×40 · “4.3”
        - **Frame 2087323813** · `FRAME` · 712×20 · horizontal row, gap 4px · 1 children
          - **Based on 653 ratings** · `TEXT` · 138×20 · “Based on 653 ratings”
      - **Frame 2087324454** · `FRAME` · 712×124 · horizontal row, padding 24/40/24/40px · 1 children
        - **Frame 2087324456** · `FRAME` · 632×76 · horizontal row, gap 16px · 7 children
          - **Frame 2087324462** · `FRAME` · 134×76 · vertical stack, gap 8px · 3 children
            - **Path** · `INSTANCE` · 18×18 · instance of Path
            - **Placeholder** · `TEXT` · 87×20 · “Connectivity”
            - **4.8** · `TEXT` · 23×22 · “4.8”
          - **Line 2** · `LINE` · 76×0
          - **Frame 2087324460** · `FRAME` · 134×76 · vertical stack, gap 8px · 3 children
            - **MapPinArea** · `INSTANCE` · 18×18 · instance of MapPinArea
            - **Placeholder** · `TEXT` · 109×20 · “Neighbourhood”
            - **4.7** · `TEXT` · 22×22 · “4.7”
          - **Line 4** · `LINE` · 76×0
          - **Frame 2087324459** · `FRAME` · 134×76 · vertical stack, gap 8px · 3 children
            - **Shield** · `INSTANCE` · 18×18 · instance of Shield
            - **Placeholder** · `TEXT` · 44×20 · “Safety”
            - **4.7** · `TEXT` · 22×22 · “4.7”
          - **Line 5** · `LINE` · 76×0
          - **Frame 2087324461** · `FRAME` · 134×76 · vertical stack, gap 8px · 3 children
            - **Smiley** · `INSTANCE` · 18×18 · instance of Smiley
            - **Placeholder** · `TEXT` · 61×20 · “Livability”
            - **4.0** · `TEXT` · 24×22 · “4.0”
    - **Frame 2147261511** · `FRAME` · 712×258 · vertical stack, gap 16px · 2 children
      - **Frame 2147261490** · `FRAME` · 712×22 · horizontal row, gap 12px · 2 children
        - **Frame 2147261486** · `FRAME` · 591×22 · horizontal row, gap 4px · 1 children
          - **127 reviews** · `TEXT` · 85×22 · “127 reviews”
        - **Button** · `INSTANCE` · 109×16 · horizontal row, gap 4px · instance of Button
      - **Frame 2147261499** · `FRAME` · 824×220 · horizontal row, gap 24px · 3 children
        - **Frame 2147261489** · `FRAME` · 400×220 · vertical stack, gap 24px, padding 16px · 2 children
          - **Frame 2147261491** · `FRAME` · 368×44 · horizontal row, gap 56px · 2 children
            - **Frame 2087324817** · `FRAME` · 185×44 · horizontal row, gap 12px
              - _…and 2 more_
            - **badge/base** · `FRAME` · 56×24 · horizontal row, gap 4px, padding 4/8/4/8px
              - _…and 2 more_
          - **Frame 2147261496** · `FRAME` · 368×120 · vertical stack, gap 10px, padding 16/0/16/0px · 1 children
            - **Frame 2147261494** · `FRAME` · 368×88 · vertical stack, gap 8px
              - _…and 2 more_
        - **Frame 2147261494** · `FRAME` · 400×220 · vertical stack, gap 24px, padding 16px · 2 children
          - **Frame 2147261491** · `FRAME` · 368×44 · horizontal row, gap 56px · 2 children
            - **Frame 2087324817** · `FRAME` · 185×44 · horizontal row, gap 12px
              - _…and 2 more_
            - **badge/base** · `FRAME` · 56×24 · horizontal row, gap 4px, padding 4/8/4/8px
              - _…and 2 more_
          - **Frame 2147261496** · `FRAME` · 368×120 · vertical stack, gap 10px, padding 16/0/16/0px · 1 children
            - **Frame 2147261494** · `FRAME` · 368×88 · vertical stack, gap 8px
              - _…and 2 more_
        - **Frame 2147261493** · `FRAME` · 42×42 · horizontal row, gap 10px, padding 12px · 1 children
          - **Frame 2087324448** · `FRAME` · 18×18 · horizontal row, gap 4px · 1 children
            - **CaretRight** · `INSTANCE` · 18×18 · instance of CaretRight

### Floor plan cards

Page: PDP  · 2 variants

Reuse: import existing — key `6f601f8ccdbb7408d5554f4371f5b00b59a03df8` · node `3788:13583`

| Property | Values |
|---|---|
| Property 1 | Default, No image |

Sample variant structure:

- **Property 1=Default** · `COMPONENT` · 320×562 · vertical stack · 5 children
  - **Frame 2147261418** · `FRAME` · 320×252 · vertical stack, gap 10px, padding 16px · 1 children
    - **image 1** · `RECTANGLE` · 220×220
  - **Frame 2147261419** · `FRAME` · 320×310 · vertical stack, gap 16px, padding 16px · 6 children
    - **Frame 2147261439** · `FRAME` · 95×50 · vertical stack, gap 8px · 2 children
      - **Configuration** · `TEXT` · 95×20 · “Configuration”
      - **2 BHK** · `TEXT` · 45×22 · “2 BHK”
    - **Line 2** · `LINE` · 288×0
    - **Frame 2147261440** · `FRAME` · 131×50 · vertical stack, gap 8px · 2 children
      - **Super built-up area** · `TEXT` · 131×20 · “Super built-up area”
      - **1500-1700 sq.ft.** · `TEXT` · 120×22 · “1500-1700 sq.ft.”
    - **Line 4** · `LINE` · 288×0
    - **Frame 2147261441** · `FRAME` · 130×50 · vertical stack, gap 8px · 2 children
      - **Price** · `TEXT` · 35×20 · “Price”
      - **₹2.25 Cr - 2.55 Cr** · `TEXT` · 130×22 · “₹2.25 Cr - 2.55 Cr”
    - **Frame 2087324819** · `FRAME` · 288×48 · horizontal row, gap 8px · 1 children
      - **Button** · `INSTANCE` · 288×48 · horizontal row, gap 8px, padding 12/20/12/20px · instance of Button
  - **Frame 2087324449** · `FRAME` · 32×64 · vertical stack, gap 8px, padding 8px · 3 children
    - **Frame 2087324448** · `FRAME` · 16×16 · horizontal row, gap 4px · 1 children
      - **Plus** · `INSTANCE` · 16×16 · instance of Plus
    - **Line 7** · `LINE` · 16×0
    - **Frame 2087324449** · `FRAME` · 16×16 · horizontal row, gap 4px · 1 children
      - **Minus** · `INSTANCE` · 16×16 · instance of Minus
  - **Frame 2147261422** · `FRAME` · 32×32 · horizontal row, gap 10px, padding 8px · 1 children
    - **Frame 2087324448** · `FRAME` · 16×16 · horizontal row, gap 4px · 1 children
      - **ArrowsClockwise** · `INSTANCE` · 16×16 · instance of ArrowsClockwise
  - **Frame 2147261421** · `FRAME` · 32×32 · horizontal row, gap 10px, padding 8/6/8/6px · 1 children
    - **2D** · `TEXT` · 20×16 · “2D”

### PDP / d-web

Page: PDP  · 1 variants

Reuse: import existing — key `cdc8b1cf6c8fa01c084f9b9d6dee9e29acd088e0` · node `3313:13142`

| Property | Values |
|---|---|
| Category | Rent |

Sample variant structure:

- **Category=Rent** · `COMPONENT` · 1440×1998 · vertical stack · 1 children
  - **Container** · `FRAME` · 1440×1998 · vertical stack · 3 children
    - **PDP / d-web / Top bar** · `FRAME` · 1440×44 · horizontal row · 4 children
      - **Link** · `FRAME` · 173×44 · vertical stack, padding 13/16/13/16px · 1 children
        - **Housing.com** · `FRAME` · 141×18
      - **Container** · `FRAME` · 192×44 · vertical stack · 2 children
        - **Background** · `RECTANGLE` · 1512×805
        - **Background+VerticalBorder** · `FRAME` · 192×44 · horizontal row, gap -9px, padding 0/14/0/14px · 2 children
          - **Buy in Noida** · `TEXT` · 71×44 · “Buy in Noida”
          - **Container** · `FRAME` · 10×44 · horizontal row, padding 16.5/0/17/0px · 1 children
            - **Icon** · `FRAME` · 11×11 · 1 children
              - **Vector** · `VECTOR` · 6×11
      - **VerticalBorder** · `FRAME` · 601×44 · vertical stack, padding 5/16/5/16px · 1 children
        - **Label** · `FRAME` · 568×34 · horizontal row, padding 0/10/0/10px · 3 children
          - **Container** · `FRAME` · 18×22 · vertical stack, padding 0/0/3.5/0px · 1 children
            - **Container** · `FRAME` · 18×19 · horizontal row · 1 children
              - **Icon** · `FRAME` · 19×19
                - _…and 1 more_
          - **Margin** · `FRAME` · 99×26 · vertical stack, padding 0/2/0/2px · 1 children
            - **Background** · `FRAME` · 95×26 · 2 children
              - **Container** · `FRAME` · 57×25 · horizontal row
                - _…and 1 more_
              - **Container** · `FRAME` · 9×9
                - _…and 1 more_
          - **Margin** · `FRAME` · 60×27 · vertical stack, padding 0/2/0/2px · 1 children
            - **Background+Border** · `FRAME` · 56×27 · vertical stack, padding 0/10/0/10px · 1 children
              - **Container** · `FRAME` · 34×25 · horizontal row
                - _…and 1 more_
      - **Container** · `FRAME` · 474×44 · horizontal row · 4 children
        - **Link** · `FRAME` · 129×44 · vertical stack · 1 children
          - **VerticalBorder** · `FRAME` · 129×44 · horizontal row, gap 5px, padding 4.5/15/0/15px · 2 children
            - **Container** · `FRAME` · 11×16 · horizontal row · 1 children
              - **Icon** · `FRAME` · 11×16
                - _…and 1 more_
            - **Download App** · `TEXT` · 82×44 · “Download App”
        - **Link:margin** · `FRAME` · 152×44 · vertical stack, padding 7/10/7/10px · 1 children
          - **Link** · `FRAME` · 132×30 · horizontal row, gap 6px, padding 6px · 2 children
            - **List Property** · `TEXT` · 73×18 · “List Property”
            - **Background** · `FRAME` · 33×18 · horizontal row, padding 0/6/0/6px · 1 children
              - **Free** · `TEXT` · 21×18 · “Free”
        - **Link** · `FRAME` · 113×44 · vertical stack · 1 children
          - **VerticalBorder** · `FRAME` · 113×44 · horizontal row, gap 5px, padding 4.5/15/0/15px · 2 children
            - **Container** · `FRAME` · 16×16 · horizontal row · 1 children
              - **Icon** · `FRAME` · 16×16
                - _…and 1 more_
            - **Saved** · `TEXT` · 35×44 · “Saved”
        - **Margin** · `FRAME` · 80×32 · vertical stack, padding 0/12/0/0px · 1 children
          - **Background+VerticalBorder** · `FRAME` · 68×32 · horizontal row · 2 children
            - **Margin** · `FRAME` · 23×13 · vertical stack, padding 0/10/0/0px · 1 children
              - **Container** · `FRAME` · 13×13 · vertical stack
                - _…and 1 more_
            - **tenant-avatar.cedc2f44.png** · `FRAME` · 24×24
    - **PDP / d-web / Hero section** · `FRAME` · 1440×660 · vertical stack, gap 8px · 2 children
      - **Container** · `FRAME` · 1064×593 · vertical stack, gap 5px · 3 children
        - **Container** · `FRAME` · 1064×38 · horizontal row, gap 633.0399780273438px · 2 children
          - **Section** · `FRAME` · 267×14 · horizontal row · 1 children
            - **List** · `FRAME` · 267×14 · horizontal row · 4 children
              - **Item** · `FRAME` · 48×14 · horizontal row, gap 3px, padding 0/3/0/0px
                - _…and 2 more_
              - **Item** · `FRAME` · 47×14 · horizontal row, gap 3px, padding 0/3/0/0px
                - _…and 2 more_
              - **Item** · `FRAME` · 73×14 · horizontal row, gap 3px, padding 0/3.009999990463257/0/0px
                - _…and 2 more_
              - **Item → ABA Cleo County** · `TEXT` · 99×14 · “ABA Cleo County”
          - **Container** · `FRAME` · 169×38 · 2 children
            - **Last updated: Apr 6, 2026** · `TEXT` · 150×12 · “Last updated: Apr 6, 2026”
            - **Container** · `FRAME` · 15×15 · horizontal row · 1 children
              - **Icon** · `FRAME` · 15×15
                - _…and 1 more_
        - **Container** · `FRAME` · 1064×110 · horizontal row, gap 78.55000305175781px, padding 3/0/0/0px · 2 children
          - **Container** · `FRAME` · 710×107 · vertical stack, gap 8px · 4 children
            - **Container** · `FRAME` · 710×29 · horizontal row · 1 children
              - **Container** · `FRAME` · 290×29 · horizontal row, gap 16px, padding 0/40/0/0px
                - _…and 2 more_
            - **Container** · `FRAME` · 710×17 · horizontal row, gap 12px · 3 children
              - **Semi Furnished** · `TEXT` · 102×17 · “Semi Furnished”
              - **Vector 934** · `VECTOR` · 0×17
              - **Frame 2087324989** · `FRAME` · 161×17 · horizontal row, gap 4px
                - _…and 2 more_
            - **Container** · `FRAME` · 710×17 · vertical stack · 1 children
              - **GH-5, Sector 121, Noida** · `TEXT` · 710×17 · “GH-5, Sector 121, Noida”
            - **Tags** · `INSTANCE` · 68×20 · horizontal row · instance of Tags
          - **Container** · `FRAME` · 134×105 · vertical stack, gap 8px · 3 children
            - **Container** · `FRAME` · 103×24 · horizontal row, gap 4px · 2 children
              - **Container** · `FRAME` · 12×21 · horizontal row
                - _…and 1 more_
              - **3,00,000** · `TEXT` · 87×24 · “3,00,000”
            - **Container** · `FRAME` · 124×17 · horizontal row · 1 children
              - **Added 25 days ago** · `TEXT` · 124×17 · “Added 25 days ago”
            - **button** · `INSTANCE` · 134×48 · horizontal row · instance of button
        - **Container** · `FRAME` · 1064×435 · vertical stack, padding 11/0/0/0px · 3 children
          - **Container** · `FRAME` · 740×425 · vertical stack · 4 children
            - **Gallery Cover Pic of ABA Cleo County** · `FRAME` · 740×425
            - **Gallery Cover Pic of ABA Cleo County** · `FRAME` · 740×425
            - **Overlay** · `FRAME` · 75×19 · vertical stack, padding 0/4/0/4px · 1 children
              - **Cover Image** · `TEXT` · 67×19 · “Cover Image”
            - **Container** · `FRAME` · 188×36 · vertical stack · 1 children
              - **Container** · `FRAME` · 180×36 · horizontal row, gap 8px
                - _…and 2 more_
          - **Container** · `FRAME` · 317×209 · vertical stack · 2 children
            - **ABA Cleo County Project Tour 1** · `FRAME` · 317×209
            - **Container** · `FRAME` · 317×209 · horizontal row · 1 children
              - **Background** · `FRAME` · 70×70 · vertical stack, padding 22.799999237060547/9.699999809265137/21.610000610351562/14.300000190734863px
                - _…and 1 more_
          - **Container** · `FRAME` · 317×209 · vertical stack · 2 children
            - **ABA Cleo County Elevation 1** · `FRAME` · 317×209
            - **Overlay** · `FRAME` · 317×209 · vertical stack · 2 children
              - **Container** · `FRAME` · 16×29 · vertical stack
                - _…and 1 more_
              - **Container** · `FRAME` · 96×29 · vertical stack
                - _…and 1 more_
      - **Background+HorizontalBorder+Shadow** · `FRAME` · 1440×59 · vertical stack, padding 0/224/0/224px · 1 children
        - **Container** · `FRAME` · 992×58 · horizontal row, gap 24px · 6 children
          - **HorizontalBorder** · `FRAME` · 82×58 · horizontal row, padding 15/4/15/4px · 2 children
            - **Overview** · `TEXT` · 74×26 · “Overview”
            - **Vector 935** · `VECTOR` · 82×0
          - **HorizontalBorder** · `FRAME` · 103×58 · horizontal row, padding 15/4/15/4px · 1 children
            - **Furnishings** · `TEXT` · 95×26 · “Furnishings”
          - **HorizontalBorder** · `FRAME` · 89×58 · horizontal row, padding 15/4/15/4px · 1 children
            - **Amenities** · `TEXT` · 81×26 · “Amenities”
          - **HorizontalBorder** · `FRAME` · 154×58 · horizontal row, padding 15/4/15/4px · 1 children
            - **Ratings & Reviews** · `TEXT` · 146×26 · “Ratings & Reviews”
          - **HorizontalBorder** · `FRAME` · 107×58 · horizontal row, padding 15/4/15/4px · 1 children
            - **Price Trends** · `TEXT` · 99×26 · “Price Trends”
          - **HorizontalBorder** · `FRAME` · 196×58 · horizontal row, padding 15/4/15/4px · 1 children
            - **Explore Neighbourhood** · `TEXT` · 188×26 · “Explore Neighbourhood”
    - **Container** · `FRAME` · 1064×1294 · horizontal row, gap 15px, padding 32/0/32/0px · 2 children
      - **Container** · `FRAME` · 689×1230 · vertical stack, gap 16px · 2 children
        - **Section** · `FRAME` · 689×309 · vertical stack, padding 16/0/0/0px · 1 children
          - **Section** · `FRAME` · 689×293 · vertical stack, gap 24px, padding 24/0/20/0px · 2 children
            - **Frame 2087324993** · `FRAME` · 689×209 · vertical stack, gap 16px · 2 children
              - **Margin** · `FRAME` · 689×40 · vertical stack
                - _…and 1 more_
              - **Container** · `FRAME` · 689×153 · vertical stack, padding 0/16/0/16px
                - _…and 1 more_
            - **.demand_text_cta** · `INSTANCE` · 129×16 · horizontal row, gap 4px · instance of .demand_text_cta
        - **Section** · `FRAME` · 689×905 · vertical stack, padding 16/0/0/0px · 1 children
          - **Section** · `FRAME` · 689×889 · vertical stack · 2 children
            - **Container** · `FRAME` · 689×60 · horizontal row, gap 236.1199951171875px, padding 0/20/0/0px · 1 children
              - **Heading 2** · `FRAME` · 269×60 · vertical stack, padding 16px
                - _…and 1 more_
            - **Table → Body** · `FRAME` · 689×829 · vertical stack, gap 32px, padding 16/16/32/16px · 10 children
              - **Frame 2087324994** · `FRAME` · 657×36 · horizontal row, gap 24px
                - _…and 2 more_
              - **Frame 2087324995** · `FRAME` · 657×60 · horizontal row, gap 24px
                - _…and 2 more_
              - **Frame 2087324996** · `FRAME` · 657×36 · horizontal row, gap 24px
                - _…and 2 more_
              - **Frame 2087324997** · `FRAME` · 657×36 · horizontal row, gap 24px
                - _…and 2 more_
              - **Frame 2087325001** · `FRAME` · 657×36 · horizontal row, gap 24px
                - _…and 2 more_
              - **Frame 2087324998** · `FRAME` · 657×36 · horizontal row, gap 24px
                - _…and 2 more_
              - **Frame 2087324999** · `FRAME` · 657×36 · horizontal row, gap 24px
                - _…and 2 more_
              - **Frame 2087325000** · `FRAME` · 657×36 · horizontal row, gap 24px
                - _…and 2 more_
              - **Frame 2087325002** · `FRAME` · 657×141 · vertical stack, gap 12px
                - _…and 2 more_
              - **Container** · `FRAME` · 657×40 · horizontal row, gap 8px
                - _…and 2 more_
      - **PDP / d-web / Contact form** · `FRAME` · 360×720 · vertical stack, gap 16px · 3 children
        - **Project name** · `FRAME` · 361×72 · vertical stack, gap 16px, padding 16px · 1 children
          - **Seller detail** · `FRAME` · 329×40 · horizontal row, gap 12px · 2 children
            - **Frame 2087330164** · `FRAME` · 40×40 · horizontal row, gap 10px · 1 children
              - **WarningOctagon** · `INSTANCE` · 20×20 · instance of WarningOctagon
            - **Frame 2087330163** · `FRAME` · 184×36 · vertical stack, gap 4px · 2 children
              - **Think this property is yours?** · `TEXT` · 184×16 · “Think this property is yours?”
              - **button** · `INSTANCE` · 116×16 · horizontal row · instance of button
        - **Frame 2087324991** · `FRAME` · 360×663 · vertical stack · 2 children
          - **Section** · `FRAME` · 360×581 · vertical stack, gap 16px, padding 16px · 2 children
            - **Background+Border** · `FRAME` · 328×40 · 2 children
              - **Container** · `FRAME` · 11×15 · horizontal row
                - _…and 1 more_
              - **Nice choice. Let’s connect with the Seller** · `TEXT` · 239×15 · “Nice choice. Let’s connect with the Seller”
            - **Container** · `FRAME` · 328×493 · vertical stack, gap 16px · 3 children
              - **Frame 2087324992** · `FRAME` · 328×365 · vertical stack, gap 12px
                - _…and 2 more_
              - **Background+Border** · `FRAME` · 328×48 · horizontal row, gap 8px, padding 12px
                - _…and 2 more_
              - **Button** · `FRAME` · 328×48 · vertical stack, padding 0/14/0/14px
                - _…and 1 more_
          - **Background** · `FRAME` · 360×82 · vertical stack · 2 children
            - **stillPending.63bc8f51.svg clip** · `FRAME` · 360×82 · vertical stack · 1 children
              - **stillPending.63bc8f51.svg** · `FRAME` · 360×82
                - _…and 1 more_
            - **Container** · `FRAME` · 360×62 · horizontal row, gap 5.684341886080802e-14px · 2 children
              - **Margin** · `FRAME` · 264×62 · vertical stack, padding 0/0/0/16px
                - _…and 1 more_
              - **Margin** · `FRAME` · 96×62 · vertical stack, padding 20/0/0/0px
                - _…and 1 more_
        - **Background+VerticalBorder** · `FRAME` · 360×42 · horizontal row, gap 4px, padding 0/0/1.5/0px · 2 children
          - **ShareNetwork** · `INSTANCE` · 20×20 · instance of ShareNetwork
          - **Share** · `TEXT` · 34×40 · “Share”

### Confirmation modal

Page: PDP  · 2 variants

Reuse: import existing — key `bef6b5e19253773b5bc1ea8fd9237325a17ff904` · node `3497:7363`

| Property | Values |
|---|---|
| Property 1 | Mobile-Bottomsheet, Web |

Sample variant structure:

- **Property 1=Web** · `COMPONENT` · 400×228 · vertical stack, gap 32px · 2 children
  - **States** · `FRAME` · 400×228 · vertical stack, gap 24px, padding 24px · 5 children
    - **Container** · `FRAME` · 48×48 · horizontal row · 1 children
      - **Info** · `INSTANCE` · 24×24 · instance of Info
    - **Frame 2087324277** · `FRAME` · 352×44 · vertical stack, gap 8px · 2 children
      - **Other Charges** · `TEXT` · 352×20 · “Think this property is yours?”
      - **Frame 2087324844** · `FRAME` · 352×16 · horizontal row, gap 4px · 1 children
        - **Frame 2087324407** · `FRAME` · 352×16 · horizontal row, gap 4px · 1 children
          - **Text ->** · `TEXT` · 352×16 · “Request a callback and we'll get in touch to verify”
    - **Frame 2087324903** · `FRAME` · 352×112 · vertical stack, gap 16px · 2 children
      - **Input fields** · `INSTANCE` · 352×48 · horizontal row, padding 0/16/0/16px · instance of Input fields · ×2
    - **Frame 2087324910** · `FRAME` · 352×40 · horizontal row, gap 16px · 2 children
      - **button** · `INSTANCE` · 168×40 · horizontal row · instance of button · ×2
    - **Skip** · `TEXT` · 25×16 · “Skip”
  - **Close** · `INSTANCE` · 20×20 · instance of Close

### Search bar

Page: SRP · 2 variants

Reuse: import existing — key `ae2091b84cf5d016c24b41674a2fbf81fb06f134` · node `2030:876`

| Property | Values |
|---|---|
| Property 1 | Main search, Search + AI |

Sample variant structure:

- **Property 1=Main search** · `COMPONENT` · 384×72 · vertical stack, gap 12px, padding 12/16/12/16px · 1 children
  - **Frame 2087324388** · `FRAME` · 352×48 · horizontal row, gap 8px · 2 children
    - **Back Icon** · `GROUP` · 24×24 · 2 children
      - **Mask** · `RECTANGLE` · 24×24
      - **Back Icon** · `VECTOR` · 16×16
    - **User Data Field** · `FRAME` · 320×48 · horizontal row, gap 12px, padding 16/8/16/16px · 1 children
      - **Frame 2087324384** · `FRAME` · 296×32 · horizontal row, gap 12px · 2 children
        - **Group 1000005938** · `GROUP` · 252×18 · 1 children
          - **Frame 2087324374** · `FRAME` · 252×18 · horizontal row, gap 8px · 1 children
            - **Frame 2087324378** · `FRAME` · 252×18 · horizontal row, gap 2px
              - _…and 2 more_
        - **Group 56** · `GROUP` · 32×32 · 1 children
          - **Frame 2087324383** · `FRAME` · 32×32 · horizontal row, gap 10px, padding 6px · 1 children
            - **Frame** · `FRAME` · 20×20
              - _…and 2 more_

### Bottom navigation

Page: SRP · 3 variants

Reuse: import existing — key `d79307b426aaecbbf9d8fe73fe2639d3c55cb91c` · node `2117:6257`

| Property | Values |
|---|---|
| Property 1 | AI, Default, Buy |

Sample variant structure:

- **Property 1=Default** · `COMPONENT` · 360×60 · horizontal row, gap 12px, padding 0/16/0/16px · 4 children
  - **Nav items** · `FRAME` · 73×60 · vertical stack, padding 8/8/4/8px · 2 children
    - **Icons** · `FRAME` · 24×24 · 1 children
      - **Suggestions** · `GROUP` · 20×20 · 2 children
        - **Rectangle 1167** · `RECTANGLE` · 20×20
        - **Group 1909** · `GROUP` · 19×19 · 1 children
          - **Group 1910** · `GROUP` · 19×19 · 3 children
            - **Rectangle 1170** · `VECTOR` · 16×16
            - **Rectangle 1171** · `VECTOR` · 14×14
            - **Fill 3** · `VECTOR` · 8×8
    - **Text** · `FRAME` · 80×24 · horizontal row, gap 4px, padding 4px · 1 children
      - **Filter** · `TEXT` · 72×16 · “Suggestions”
  - **Nav items** · `FRAME` · 73×60 · vertical stack, padding 8/8/4/8px · 2 children
    - **Icons** · `FRAME` · 24×24 · 1 children
      - **Saved** · `GROUP` · 20×20 · 2 children
        - **Rectangle 1168** · `RECTANGLE` · 20×20
        - **Vector** · `VECTOR` · 20×18
    - **Text** · `FRAME` · 44×24 · horizontal row, gap 4px, padding 4px · 1 children
      - **Filter** · `TEXT` · 36×16 · “Saved”
  - **Nav items** · `FRAME` · 73×60 · vertical stack, padding 8/8/4/8px · 2 children
    - **Icons** · `FRAME` · 24×24 · 1 children
      - **Profile** · `GROUP` · 20×20 · 2 children
        - **Rectangle 1169** · `RECTANGLE` · 20×20
        - **Profile** · `GROUP` · 18×18 · 2 children
          - **Group 1911** · `GROUP` · 7×9 · 2 children
            - **Fill 3** · `VECTOR` · 5×5
            - **Fill 5** · `VECTOR` · 7×4
          - **Ellipse 172** · `VECTOR` · 18×18
    - **Text** · `FRAME` · 46×24 · horizontal row, gap 4px, padding 4px · 1 children
      - **Filter** · `TEXT` · 38×16 · “Profile”
  - **Nav items** · `FRAME` · 73×60 · vertical stack, padding 8/8/4/8px · 2 children
    - **BuildingOffice** · `INSTANCE` · 24×24 · instance of BuildingOffice
    - **Text** · `FRAME` · 50×24 · horizontal row, gap 4px, padding 4px · 1 children
      - **Filter** · `TEXT` · 42×16 · “Project”

### SRP

Page: SRP · 2 variants

Reuse: import existing — key `0c959d475afbd28f65ecefe10c4c568012d49d4c` · node `47:1482`

| Property | Values |
|---|---|
| Property 1 | Base |
| Property 2 | Top |
| Property 3 | Buy, New projects |

Sample variant structure:

- **Property 1=Base, Property 2=Top, Property 3=Buy** · `COMPONENT` · 384×195 · vertical stack · 3 children
  - **Search bar** · `INSTANCE` · 384×72 · vertical stack, gap 12px, padding 12/16/12/16px · instance of Search bar
  - **Frame 2087324394** · `INSTANCE` · 384×59 · vertical stack, gap 10px · instance of Frame 2087324394
  - **Frame 2087324395** · `FRAME` · 384×64 · horizontal row, gap 16px, padding 16/0/16/16px · 1 children
    - **Frame 2087324297** · `FRAME` · 368×32 · horizontal row, gap 8px, padding 0/16/0/0px · 4 children
      - **Filters** · `INSTANCE` · 32×32 · horizontal row, gap 8px, padding 8px · instance of Filters
      - **Filters** · `INSTANCE` · 138×32 · horizontal row, gap 8px, padding 8px · instance of Filters
      - **Filters** · `INSTANCE` · 78×32 · horizontal row, gap 4px, padding 8px · instance of Filters
      - **Filters** · `INSTANCE` · 89×32 · horizontal row, gap 4px, padding 8px · instance of Filters

### SRP cards

Page: SRP · 3 variants

Reuse: import existing — key `68923d41cac89b0f8a99f28d0af6b69d8956c7d5` · node `2596:6445`

| Property | Values |
|---|---|
| Property 1 | 3, 1, 2 |

Sample variant structure:

- **Property 1=3** · `COMPONENT` · 344×328 · vertical stack, gap 10px, padding 8px · 1 children
  - **Frame 2087324416** · `FRAME` · 336×312 · vertical stack, gap 6px · 2 children
    - **Group 1000004453** · `GROUP` · 336×116 · 2 children
      - **Frame 1000003675** · `FRAME` · 336×116 · vertical stack, gap 10px, padding 8/16/8/16px · 2 children
        - **Frame 1000003674** · `FRAME` · 344×116 · vertical stack, gap 10px, padding 8px · 2 children
          - **Frame 1000003673** · `FRAME` · 344×116 · vertical stack, gap 10px, padding 8px · 2 children
            - **serp_carousel** · `INSTANCE` · 328×116 · horizontal row, gap 8px · instance of serp_carousel
            - **Frame 1000003671** · `FRAME` · 120×16 · horizontal row, gap 8px
              - _…and 2 more_
          - **Frame 1000003672** · `FRAME` · 114×16 · horizontal row, gap 8px · 2 children
            - **Image Number** · `GROUP` · 31×16
              - _…and 2 more_
            - **Image & Card Tags/Highlights** · `INSTANCE` · 75×16 · vertical stack, gap 10px, padding 0/0/0/4px · instance of Image & Card Tags/Highlights
        - **Image Number** · `GROUP` · 41×16 · 2 children
          - **Rectangle** · `RECTANGLE` · 41×16
          - **1/23** · `TEXT` · 33×12 · “1d ago”
      - **Group 1000004283** · `GROUP` · 16×14 · 2 children
        - **Vector** · `VECTOR` · 16×14
        - **Vector** · `VECTOR` · 16×14
    - **Frame 2087324415** · `FRAME` · 336×190 · vertical stack, gap 16px · 2 children
      - **Frame 2087324407** · `FRAME` · 232×16 · horizontal row, gap 7px · 3 children
        - **Pay 10% now and rest** · `TEXT` · 86×16 · “Ready to Move”
        - **Ellipse 553** · `ELLIPSE` · 4×4
        - **Sikka Karnam Greens,** · `TEXT` · 128×16 · “Avg. Price/ sq.ft. ₹14k”
      - **Frame 2087324414** · `FRAME` · 336×158 · vertical stack, gap 14px · 2 children
        - **Frame 2087324413** · `FRAME` · 336×44 · vertical stack, gap 8px · 2 children
          - **Group 1000003864** · `GROUP` · 328×16 · 1 children
            - **Group 1000003863** · `GROUP` · 328×16
              - _…and 1 more_
          - **₹35.4 L - ₹1.15 Cr** · `TEXT` · 336×20 · “₹2.85 Cr”
        - **Frame 2087324412** · `FRAME` · 336×100 · vertical stack, gap 16px · 2 children
          - **Frame 2087324411** · `FRAME` · 287×36 · vertical stack, gap 4px · 2 children
            - **Sikka Karnam Greens,** · `TEXT` · 287×16 · “Ariisto Bellanza Phase 1 Wing Apartments Phase II”
            - **Frame 2087324419** · `FRAME` · 287×16 · horizontal row, gap 8px
              - _…and 3 more_
          - **Frame 2087324410** · `FRAME` · 336×48 · vertical stack, gap 16px · 2 children
            - **Line 41** · `LINE` · 336×0
            - **Frame 2087324409** · `FRAME` · 336×32 · horizontal row, gap 8px
              - _…and 2 more_

### SRP add ons

Page: SRP · 2 variants

Reuse: import existing — key `90398c4abc91d28db5fddac06b9a23080e3e44e2` · node `2593:3880`

| Property | Values |
|---|---|
| Property 1 | NP |
| Property 2 | New in "X", No image |

Sample variant structure:

- **Property 1=NP, Property 2=New in "X"** · `COMPONENT` · 344×458 · vertical stack, gap 6px · 1 children
  - **Frame 2087324415** · `FRAME` · 344×458 · vertical stack, gap 16px, padding 16px · 1 children
    - **Frame 2087324414** · `FRAME` · 312×426 · vertical stack, gap 14px · 2 children
      - **Frame 2147261457** · `FRAME` · 312×16 · horizontal row, gap 12px · 1 children
        - **New in Gurugram** · `TEXT` · 113×16 · “New in Gurugram”
      - **Frame 2147261456** · `FRAME` · 538×396 · horizontal row, gap 14px · 2 children
        - **Frame 2147261454** · `FRAME` · 262×396 · horizontal row, gap 14px · 1 children
          - **Cards compilation** · `FRAME` · 262×396 · vertical stack, gap 16px, padding 0/0/16/0px · 3 children
            - **Frame 2147261384** · `FRAME` · 262×120 · vertical stack, gap 10px
              - _…and 1 more_
            - **Frame 2087323803** · `FRAME` · 262×180 · vertical stack, gap 16px, padding 0/16/0/16px
              - _…and 2 more_
            - **Frame 2087324819** · `FRAME` · 262×48 · horizontal row, gap 8px, padding 0/16/0/16px
              - _…and 1 more_
        - **Frame 2147261456** · `FRAME` · 262×396 · horizontal row, gap 14px · 1 children
          - **Cards compilation** · `FRAME` · 262×396 · vertical stack, gap 16px, padding 0/0/16/0px · 3 children
            - **Frame 2147261384** · `FRAME` · 262×120 · vertical stack, gap 10px
              - _…and 1 more_
            - **Frame 2087323803** · `FRAME` · 262×180 · vertical stack, gap 16px, padding 0/16/0/16px
              - _…and 2 more_
            - **Frame 2087324819** · `FRAME` · 262×48 · horizontal row, gap 8px, padding 0/16/0/16px
              - _…and 1 more_

### NP cards

Page: SRP · 2 variants

Reuse: import existing — key `66fb5c8495dc6d2a8276ecb9941aafdf7f55a800` · node `2596:7115`

| Property | Values |
|---|---|
| Property 1 | NP cards 1, NP cards 2 |

Sample variant structure:

- **Property 1=NP cards 1** · `COMPONENT` · 344×312 · vertical stack, gap 6px · 2 children
  - **Frame 2087324894** · `FRAME` · 344×116 · horizontal row, gap 8px, padding 8/0/0/8px · 2 children
    - **Frame 2087324893** · `FRAME` · 174×108 · vertical stack, gap 68px, padding 8px · 2 children
      - **Frame 1000003671** · `FRAME` · 150×16 · horizontal row, gap 8px · 2 children
        - **Verified** · `GROUP` · 92×16 · 1 children
          - **Frame 2087324892** · `FRAME` · 92×16 · horizontal row, gap 10px, padding 2/8/2/6px · 1 children
            - **Zero brokerage** · `TEXT` · 78×12 · “Zero brokerage”
        - **rating** · `GROUP` · 50×16 · 3 children
          - **Rectangle 1183** · `RECTANGLE` · 50×16
          - **RERA** · `TEXT` · 28×12 · “RERA”
          - **Security** · `GROUP` · 16×16 · 4 children
            - **Mask** · `RECTANGLE` · 16×16
            - **Mask** · `RECTANGLE` · 12×12
            - **Union** · `VECTOR` · 10×11
            - **Path** · `VECTOR` · 5×3
      - **Verified** · `GROUP` · 37×16 · 1 children
        - **Frame 2087324892** · `FRAME` · 37×16 · horizontal row, gap 10px, padding 2/8/2/6px · 1 children
          - **1/23** · `TEXT` · 23×12 · “1/23”
    - **Frame 2087324893** · `FRAME` · 174×108 · vertical stack, gap 68px, padding 8/28/8/8px · 2 children
      - **Group 1000004283** · `GROUP` · 16×14 · 2 children
        - **Vector** · `VECTOR` · 16×14
        - **Vector** · `VECTOR` · 16×14
      - **Verified** · `GROUP` · 62×16 · 1 children
        - **Frame 2087324892** · `FRAME` · 62×16 · horizontal row, gap 10px, padding 2/8/2/6px · 1 children
          - **1 day ago** · `TEXT` · 48×12 · “1 day ago”
  - **Frame 2087324415** · `FRAME` · 344×190 · vertical stack, gap 16px, padding 0/8/8/8px · 2 children
    - **Frame 2087324407** · `FRAME` · 232×16 · horizontal row, gap 7px · 3 children
      - **Pay 10% now and rest** · `TEXT` · 86×16 · “Ready to Move”
      - **Ellipse 553** · `ELLIPSE` · 4×4
      - **Sikka Karnam Greens,** · `TEXT` · 128×16 · “Avg. Price/ sq.ft. ₹14k”
    - **Frame 2087324414** · `FRAME` · 328×150 · vertical stack, gap 14px · 2 children
      - **Frame 2087324891** · `FRAME` · 328×36 · vertical stack, gap 4px · 2 children
        - **Frame 1000003764** · `FRAME` · 161×16 · 1 children
          - **Sikka Karnam Greens,** · `TEXT` · 160×16 · “Ariisto Bellanza Phase 1”
        - **Sikka Karnam Greens,** · `TEXT` · 328×16 · “Sector 73, near Dwarka Expressway, New Gurgaon”
      - **Frame 2087324412** · `FRAME` · 328×100 · vertical stack, gap 16px · 2 children
        - **Frame 2087324411** · `FRAME` · 287×36 · vertical stack, gap 4px · 2 children
          - **Sikka Karnam Greens,** · `TEXT` · 287×16 · “3 BHK Apartment”
          - **Sikka Karnam Greens,** · `TEXT` · 287×16 · “₹ 73.50 L - ₹ 79 L”
        - **Frame 2087324410** · `FRAME` · 328×48 · vertical stack, gap 16px · 2 children
          - **Line 41** · `LINE` · 328×0
          - **Frame 2087324409** · `FRAME` · 328×32 · horizontal row, gap 8px · 2 children
            - **image** · `VECTOR` · 24×24
            - **Frame 2087324408** · `FRAME` · 297×32 · horizontal row, gap 33px
              - _…and 2 more_

### Property cards / add-ons

Page: SRP · 2 variants

Reuse: import existing — key `a33ff1e47f3afdd938f8dcea09a7b9eff90e7f4a` · node `2173:1679`

| Property | Values |
|---|---|
| Card type | NP, Resale |

Sample variant structure:

- **Card type=NP** · `COMPONENT` · 278×140 · horizontal row, gap 8px, padding 8px · 2 children
  - **Image** · `FRAME` · 84×124 · 1 children
    - **Bitmap** · `RECTANGLE` · 84×124
  - **Details** · `FRAME` · 170×124 · vertical stack, gap 12px · 2 children
    - **Info Group** · `FRAME` · 170×80 · vertical stack, gap 8px · 2 children
      - **Location Info** · `FRAME` · 170×36 · vertical stack, gap 4px · 2 children
        - **Location** · `TEXT` · 170×16 · “Godrej Palm Heights”
        - **Location** · `TEXT` · 170×16 · “Sector 89, Gurgaon”
      - **Additional Info** · `FRAME` · 170×36 · vertical stack, gap 4px · 2 children
        - **Location** · `TEXT` · 170×16 · “2, 3, 3.5, 4, 5 BHK Flats”
        - **Price** · `TEXT` · 170×16 · “₹5.15 Cr - ₹9.87 Cr”
    - **Actions** · `FRAME` · 170×32 · horizontal row, gap 8px · 2 children
      - **med_impact_button** · `INSTANCE` · 32×32 · horizontal row, gap 4px, padding 8px · instance of med_impact_button
      - **high_impact_button** · `INSTANCE` · 130×32 · horizontal row, gap 4px, padding 8/24/8/24px · instance of high_impact_button

### Property cards / M-Web

Page: SRP · 2 variants

Reuse: import existing — key `52bace3284b9cd43834efaef7648e212b765dbfb` · node `2060:2034`

| Property | Values |
|---|---|
| Property 1 | Project card, SEO cards |

Sample variant structure:

- **Property 1=SEO cards** · `COMPONENT` · 344×414 · vertical stack, padding 16/16/0/16px · 6 children
  - **sllr box** · `FRAME` · 312×26 · vertical stack, gap 10px, padding 1/8/1/1px · 1 children
    - **Frame 1000004655** · `FRAME` · 303×24 · horizontal row, gap 124px · 2 children
      - **Frame 1000004654** · `FRAME` · 99×24 · horizontal row, gap 8px · 2 children
        - **sllr img** · `GROUP` · 24×24 · 3 children
          - **expert pro img** · `GROUP` · 24×24 · 1 children
            - **sllr img** · `GROUP` · 24×24
              - _…and 2 more_
          - **Object-name initials** · `GROUP` · 22×22 · 3 children
            - **Rectangle 4294** · `RECTANGLE` · 22×22
            - **Bitmap** · `RECTANGLE` · 22×22
            - **CK** · `TEXT` · 10×10 · “CK”
          - **Object-diff-sllr-imgs** · `GROUP` · 22×22 · 9 children
            - **Rectangle 4294** · `RECTANGLE` · 22×22
            - **m3m** · `RECTANGLE` · 22×22
            - **Puranik Builders pvt. ltd.** · `RECTANGLE` · 22×22
            - **ashley** · `RECTANGLE` · 22×22
            - **Onkar Real Estate Solutions** · `RECTANGLE` · 20×20
            - **A&A associates** · `RECTANGLE` · 22×22
            - **Amit Raghav** · `RECTANGLE` · 22×22
            - **Hukam Singh** · `RECTANGLE` · 22×22
            - **Rahul Mishra** · `RECTANGLE` · 22×22
        - **Ashok Kumar Gahlot** · `TEXT` · 67×12 · “The Assetree”
      - **locality champion** · `FRAME` · 112×12 · horizontal row, gap 4px · 3 children
        - **icon** · `GROUP` · 12×12 · 2 children
          - **Rectangle 4134** · `RECTANGLE` · 12×12
          - **Group 1000003626** · `GROUP` · 9×12 · 2 children
            - **Subtract** · `BOOLEAN_OPERATION` · 9×4
              - _…and 2 more_
            - **Subtract** · `VECTOR` · 9×8
        - **Ashok Kumar Gahlot** · `TEXT` · 96×12 · “Locality Champion”
        - **group_12** · `GROUP` · 10×10 · 2 children
          - **Path** · `VECTOR` · 10×10
          - **Shape** · `BOOLEAN_OPERATION` · 1×6 · 2 children
            - **Path** · `VECTOR` · 1×4
            - **Path** · `VECTOR` · 1×1
  - **Frame 2087324441** · `FRAME` · 312×154 · horizontal row, gap 4px · 2 children
    - **Frame 2087324440** · `FRAME` · 234×154 · horizontal row, gap 10px, padding 65/125/65/125px · 2 children
      - **play btn** · `FRAME` · 24×24 · horizontal row, padding 4/10/4/10px · 1 children
        - **Path** · `VECTOR` · 7×10
      - **tag cloud** · `FRAME` · 153×16 · horizontal row, gap 4px · 7 children
        - **tags_new-launch** · `INSTANCE` · 51×16 · horizontal row · instance of tags_new-launch
        - **.tag_RERA** · `INSTANCE` · 47×16 · horizontal row, gap 4px, padding 2/4/2/4px · instance of .tag_RERA
        - **.tag_W_new-launch** · `INSTANCE` · 47×16 · horizontal row, gap 4px, padding 2/8/2/4px · instance of .tag_W_new-launch
        - **.tag_custom** · `INSTANCE` · 33×16 · horizontal row, padding 2/8/2/8px · instance of .tag_custom
        - **.tag_verified** · `INSTANCE` · 80×16 · horizontal row, gap 4px, padding 2/4/2/4px · instance of .tag_verified
        - **.tag_verified** · `INSTANCE` · 69×16 · horizontal row, gap 4px, padding 2/4/2/4px · instance of .tag_verified
        - **.tag_3D-view** · `INSTANCE` · 65×16 · horizontal row, gap 4px, padding 2/4/2/4px · instance of .tag_3D-view
    - **Frame 2087324438** · `FRAME` · 234×154 · horizontal row, gap 13px · 1 children
      - **Rectangle 4303** · `RECTANGLE` · 274×154
  - **Frame 1000004238** · `FRAME` · 312×218 · vertical stack, gap 16px, padding 8/8/16/8px · 5 children
    - **Frame 2087324444** · `FRAME` · 296×40 · horizontal row, gap 102px · 2 children
      - **Frame 2087324443** · `FRAME` · 200×40 · vertical stack, gap 8px · 2 children
        - **Amar Serenity** · `TEXT` · 165×16 · “3 BHK flat in Chhattapur”
        - **Frame 2550** · `FRAME` · 200×16 · horizontal row, gap 8px · 5 children
          - **Amar Serenity** · `TEXT` · 140×16 · “Trump Towers Delhi NCR”
          - **.tag_RERA** · `INSTANCE` · 52×16 · horizontal row, gap 4px, padding 2/4/2/4px · instance of .tag_RERA
          - **.tag_custom** · `INSTANCE` · 60×20 · horizontal row, gap 4px, padding 2/4/2/4px · instance of .tag_custom
          - **.tag_ratings** · `INSTANCE` · 42×24 · horizontal row, gap 2px, padding 2/4/2/4px · instance of .tag_ratings
          - **ratings** · `FRAME` · 42×20 · horizontal row, gap 4px, padding 4/6/4/6px
      - **Heart** · `INSTANCE` · 24×24 · instance of Heart
    - **BHK** · `INSTANCE` · 332×38 · horizontal row, gap 12px · instance of BHK
    - **Frame 2087324445** · `FRAME` · 336×20 · horizontal row, gap 4px · 2 children
      - **Apr, 2022** · `TEXT` · 64×14 · “Highlights:”
      - **Frame 1000004302** · `FRAME` · 268×20 · 1 children
        - **secondary data 2** · `FRAME` · 328×20 · horizontal row, gap 8px · 4 children
          - **Apr, 2022** · `TEXT` · 64×14 · “Highlights:”
          - **pill** · `GROUP` · 120×20 · 1 children
            - **Frame 1000004301** · `FRAME` · 120×20 · horizontal row, gap 10px, padding 2/8/2/8px
              - _…and 1 more_
          - **pill** · `GROUP` · 158×20 · 1 children
            - **Frame 1000004301** · `FRAME` · 158×20 · horizontal row, gap 10px, padding 2/8/2/8px
              - _…and 1 more_
          - **pill** · `GROUP` · 93×20 · 1 children
            - **Frame 1000004301** · `FRAME` · 93×20 · horizontal row, gap 10px, padding 2/8/2/8px
              - _…and 1 more_
    - **Line 43** · `LINE` · 296×0
    - **bottom-sllr** · `FRAME` · 296×32 · horizontal row, gap 8px · 2 children
      - **by Amar Realtors** · `TEXT` · 60×32 · “Updated 6d ago”
      - **Frame 1000004658** · `FRAME` · 200×32 · horizontal row, gap 8px · 2 children
        - **.demand_secondary** · `FRAME` · 89×32 · horizontal row, gap 4px, padding 0/20/0/20px · 3 children
          - **WhatsApp_Logo_1** · `RECTANGLE` · 16×16
          - **Label** · `TEXT` · 29×16 · “Chat”
          - **ChevronRight** · `INSTANCE` · 12×12 · instance of ChevronRight
        - **.demand_primary** · `INSTANCE` · 103×32 · horizontal row, gap 4px, padding 0/8/0/8px · instance of .demand_primary
  - **Frame 2087324883** · `FRAME` · 312×196 · vertical stack, gap 16px, padding 16/8/8/8px · 2 children
    - **Frame 2087324882** · `FRAME` · 296×16 · horizontal row, gap 39px · 2 children
      - **Frame 1000003703** · `FRAME` · 234×16 · vertical stack, gap 4px · 1 children
        - **Buyers like you also viewed** · `TEXT` · 234×16 · “Buyers like you also viewed”
      - **See all** · `TEXT` · 39×16 · “See all”
    - **Frame 2087324884** · `FRAME` · 311×140 · horizontal row, gap 8px · 2 children
      - **Property cards / add-ons** · `INSTANCE` · 278×140 · horizontal row, gap 8px, padding 8px · instance of Property cards / add-ons · ×2
  - **Frame 2087324439** · `FRAME` · 328×0 · vertical stack · 1 children
    - **Line 43** · `LINE` · 328×0
  - **Frame 2087324447** · `FRAME` · 312×196 · vertical stack, gap 16px, padding 16/0/8/8px · 2 children
    - **Frame 2087324887** · `FRAME` · 312×16 · horizontal row, gap 39px · 2 children
      - **Frame 1000003703** · `FRAME` · 234×16 · vertical stack, gap 4px · 1 children
        - **Buyers like you also viewed** · `TEXT` · 234×16 · “Buyers like you also viewed”
      - **See all** · `TEXT` · 39×16 · “See all”
    - **Frame 2087324888** · `FRAME` · 564×140 · horizontal row, gap 8px · 2 children
      - **Property cards / add-ons** · `INSTANCE` · 278×140 · horizontal row, gap 8px, padding 8px · instance of Property cards / add-ons · ×2

### .Property cards

Page: SRP · 2 variants

Reuse: import existing — key `8672ea4928e3c2a77e55cedad511ad74e4c0e241` · node `2073:2264`

| Property | Values |
|---|---|
| Property 1 | Desktop |
| Property 2 | 1, 2 |

Sample variant structure:

- **Property 1=Desktop, Property 2=1** · `COMPONENT` · 872×238 · horizontal row, gap 16px, padding 8px · 2 children
  - **Frame 2087324489** · `FRAME` · 366×222 · vertical stack · 3 children
    - **top sllr deatils** · `GROUP` · 366×32 · 3 children
      - **100+ buyers contacted** · `FRAME` · 141×12 · horizontal row, gap 4px
      - **Frame 1000004629** · `FRAME` · 34×34 · horizontal row, gap 8px · 1 children
        - **Object-diff-sllr-imgs** · `GROUP` · 34×34 · 11 children
          - **Rectangle 4294** · `RECTANGLE` · 34×34
          - **Rectangle 4295** · `RECTANGLE` · 34×34
          - **m3m** · `RECTANGLE` · 34×34
          - **Puranik Builders pvt. ltd.** · `RECTANGLE` · 34×34
          - **ashley** · `RECTANGLE` · 34×34
          - **Onkar Real Estate Solutions** · `RECTANGLE` · 32×32
          - **A&A associates** · `RECTANGLE` · 34×34
          - **Amit Raghav** · `RECTANGLE` · 34×34
          - **Hukam Singh** · `RECTANGLE` · 34×34
          - **Rahul Mishra** · `RECTANGLE` · 34×34
          - **image 13** · `RECTANGLE` · 22×21
      - **Frame 2087324488** · `FRAME` · 366×32 · vertical stack, gap 10px, padding 4/217/4/4px · 2 children
        - **Frame 1000004632** · `FRAME` · 145×24 · horizontal row, gap 8px · 2 children
          - **sllr img** · `GROUP` · 24×24 · 3 children
            - **expert pro img** · `GROUP` · 24×24
              - _…and 1 more_
            - **Object-name initials** · `GROUP` · 26×26
              - _…and 3 more_
            - **Object-diff-sllr-imgs** · `GROUP` · 26×26
              - _…and 9 more_
          - **Ashok Kumar Gahlot** · `TEXT` · 113×16 · “M3M India Pvt. Ltd.”
        - **locality champion** · `FRAME` · 112×12 · horizontal row, gap 4px · 3 children
          - **Group** · `GROUP` · 12×12 · 2 children
            - **Rectangle 4134** · `RECTANGLE` · 12×12
            - **Group** · `GROUP` · 12×12
              - _…and 2 more_
          - **Ashok Kumar Gahlot** · `TEXT` · 96×12 · “Locality Champion”
          - **group_12** · `GROUP` · 10×10 · 2 children
            - **Path** · `VECTOR` · 10×10
            - **Shape** · `BOOLEAN_OPERATION` · 1×6
              - _…and 2 more_
    - **Rectangle 6156** · `RECTANGLE` · 366×190
    - **tag cloud** · `FRAME` · 165×20 · horizontal row, gap 4px · 7 children
      - **tags_new-launch** · `INSTANCE` · 51×16 · horizontal row · instance of tags_new-launch
      - **.tag_RERA** · `INSTANCE` · 47×16 · horizontal row, gap 4px, padding 2/4/2/4px · instance of .tag_RERA
      - **.tag_W_new-launch** · `INSTANCE` · 47×16 · horizontal row, gap 4px, padding 2/8/2/4px · instance of .tag_W_new-launch
      - **.tag_custom** · `INSTANCE` · 33×16 · horizontal row, padding 2/8/2/8px · instance of .tag_custom
      - **.tag_verified** · `INSTANCE` · 85×20 · horizontal row, gap 4px, padding 2/4/2/4px · instance of .tag_verified
      - **.tag_verified** · `INSTANCE` · 76×20 · horizontal row, gap 4px, padding 2/4/2/4px · instance of .tag_verified
      - **.tag_3D-view** · `INSTANCE` · 65×16 · horizontal row, gap 4px, padding 2/4/2/4px · instance of .tag_3D-view
  - **Frame 1000004293** · `FRAME` · 474×222 · vertical stack, gap 16px · 3 children
    - **Frame 1000003771** · `FRAME` · 413×56 · vertical stack, gap 8px · 1 children
      - **Frame 1000003770** · `FRAME` · 413×56 · vertical stack, gap 16px · 2 children
        - **tag cloud** · `FRAME` · 104×20 · horizontal row, gap 4px · 4 children
          - **.tag_custom** · `INSTANCE` · 104×20 · horizontal row, padding 2/8/2/8px · instance of .tag_custom
          - **.tag_custom** · `INSTANCE` · 60×20 · horizontal row, gap 4px, padding 2/8/2/4px · instance of .tag_custom
          - **.tag_custom** · `INSTANCE` · 68×20 · horizontal row, gap 4px, padding 2/4/2/4px · instance of .tag_custom · ×2
        - **Frame 1000004652** · `FRAME` · 174×20 · vertical stack, gap 8px · 1 children
          - **Frame 2552** · `FRAME` · 174×20 · horizontal row, gap 8px · 4 children
            - **Amar Serenity** · `TEXT` · 114×20 · “M3M Soulitude”
            - **.tag_custom** · `INSTANCE` · 52×16 · horizontal row, gap 4px, padding 2/4/2/4px · instance of .tag_custom
            - **.tag_ratings** · `INSTANCE` · 42×24 · horizontal row, gap 2px, padding 2/4/2/4px · instance of .tag_ratings
            - **RERA tag** · `GROUP` · 50×20
              - _…and 1 more_
    - **Frame 2087324880** · `FRAME` · 474×70 · vertical stack, gap 16px · 2 children
      - **Frame 2552** · `FRAME` · 366×38 · horizontal row, gap 16px · 5 children
        - **Frame 2555** · `FRAME` · 127×38 · vertical stack, gap 2px · 2 children
          - **by Amar Realtors** · `TEXT` · 127×20 · “₹2.5 Cr”
          - **by Amar Realtors** · `TEXT` · 127×16 · “Avg. price: ₹22 k/sq.ft”
        - **Line 28** · `VECTOR` · 32×0
        - **Frame 2556** · `FRAME` · 70×34 · vertical stack, gap 2px · 2 children
          - **by Amar Realtors** · `TEXT` · 70×16 · “13500 sq.ft”
          - **by Amar Realtors** · `TEXT` · 70×16 · “Builtup area”
        - **Line 29** · `VECTOR` · 32×0
        - **Frame 2559** · `FRAME` · 105×34 · vertical stack, gap 2px · 2 children
          - **by Amar Realtors** · `TEXT` · 105×16 · “2nd March, 2026”
          - **by Amar Realtors** · `TEXT` · 105×16 · “Possession status”
      - **tertiary data** · `GROUP` · 474×16 · 1 children
        - **Frame 1000003760** · `FRAME` · 474×16 · horizontal row, gap 8px · 6 children
          - **Apr, 2020** · `TEXT` · 61×16 · “Amenities:”
          - **Apr, 2021** · `TEXT` · 20×16 · “Lift”
          - **Ellipse 673** · `ELLIPSE` · 4×4
          - **1, 1.5, 2, 3 BHK Apa** · `TEXT` · 44×16 · “Parking”
          - **Ellipse 672** · `ELLIPSE` · 4×4
          - **₹5.2 k per sqft.** · `TEXT` · 81×16 · “Power backup”
    - **Frame 2087324486** · `FRAME` · 460×40 · horizontal row, gap 212px · 2 children
      - **by Amar Realtors** · `TEXT` · 55×32 · “Updated 6 d ago”
      - **btm ctas** · `FRAME` · 193×40 · horizontal row, gap 16px · 3 children
        - **button** · `INSTANCE` · 102×40 · horizontal row · instance of button
        - **CTA** · `FRAME` · 40×40 · vertical stack, gap 10px, padding 6/10/6/10px · 1 children
          - **Shortlist** · `INSTANCE` · 16×14 · instance of Shortlist
        - **All CTA** · `FRAME` · 137×40 · horizontal row, gap 8px · 2 children
          - **CTA** · `INSTANCE` · 46×40 · horizontal row, gap 10px, padding 14/16/14/16px · instance of CTA
          - **CTA** · `INSTANCE` · 137×40 · horizontal row, gap 10px, padding 12/24/12/24px · instance of CTA

### Dweb / SRP / Header

Page: SRP · 2 variants

Reuse: import existing — key `ef3198483a6b1180a7c5445fa0c5c8d3a80e55a1` · node `2653:6525`

| Property | Values |
|---|---|
| Property 1 | Default placeholder, Locality searched |

Sample variant structure:

- **Property 1=Default placeholder** · `COMPONENT` · 1709×40 · horizontal row, gap 16px, padding 0/20/0/20px · 2 children
  - **Frame 2087324450** · `FRAME` · 852×40 · horizontal row, gap 16px · 5 children
    - **logo** · `GROUP` · 124×16 · 1 children
      - **Frame 2087324446** · `FRAME` · 124×16 · horizontal row, gap 2px · 3 children
        - **Group** · `GROUP` · 16×16 · 2 children
          - **Fill 1** · `VECTOR` · 16×16
          - **Fill 3** · `VECTOR` · 11×7
        - **Group 3** · `GROUP` · 82×15 · 9 children
          - **Fill 5** · `VECTOR` · 7×7
          - **Fill 7** · `VECTOR` · 3×14
          - **Fill 9** · `VECTOR` · 3×6
          - **Fill 11** · `BOOLEAN_OPERATION` · 11×15 · 2 children
            - **Path** · `VECTOR` · 11×15
            - **Path** · `VECTOR` · 5×9
          - **Fill 13** · `VECTOR` · 11×14
          - **Fill 15** · `VECTOR` · 10×15
          - **Fill 17** · `VECTOR` · 3×14
          - **Fill 19** · `VECTOR` · 11×14
          - **Fill 21** · `VECTOR` · 11×15
        - **Group 4** · `GROUP` · 22×8 · 1 children
          - **.COM** · `VECTOR` · 22×8
    - **Line 50** · `VECTOR` · 40×0
    - **city dd** · `FRAME` · 134×16 · horizontal row, gap 4px · 2 children
      - **Buy in Gurgaon** · `TEXT` · 88×16 · “Buy in Gurgaon”
      - **Frame 1000004746** · `FRAME` · 12×14 · 1 children
        - **chevron-down** · `VECTOR` · 8×4
    - **Line 51** · `VECTOR` · 40×0
    - **Frame 2087324448** · `FRAME` · 530×32 · horizontal row, gap 8px, padding 8/304/8/9px · 2 children
      - **magnifying-glass** · `GROUP` · 16×16 · 1 children
        - **Shape** · `BOOLEAN_OPERATION` · 16×16 · 2 children
          - **Path** · `VECTOR` · 16×16
          - **Path** · `VECTOR` · 11×11
      - **Search Placeholder** · `TEXT` · 194×16 · “Enter Locality, Landmark, Project...”
  - **Frame 2087324449** · `FRAME` · 578×40 · horizontal row, gap 16px · 10 children
    - **Line 52** · `VECTOR` · 40×0
    - **download app link** · `FRAME` · 101×16 · horizontal row, gap 2px · 2 children
      - **phone icon** · `GROUP` · 16×16 · 2 children
        - **Rectangle 6155** · `RECTANGLE` · 16×16
        - **Vector** · `VECTOR` · 10×15
      - **Download App** · `TEXT` · 83×16 · “Download App”
    - **Line 54** · `VECTOR` · 40×0
    - **post prop** · `FRAME` · 55×16 · horizontal row, gap 4px · 2 children
      - **Mask group** · `GROUP` · 16×14 · 1 children
        - **Group 1000004283** · `GROUP` · 16×14 · 1 children
          - **Vector** · `VECTOR` · 16×14
      - **Saved** · `TEXT` · 35×16 · “Saved”
    - **Line 53** · `VECTOR` · 40×0
    - **download app link** · `FRAME` · 98×16 · horizontal row, gap 4px · 3 children
      - **phone icon** · `GROUP` · 19×16 · 1 children
        - **Group 1000004285** · `GROUP` · 19×16 · 6 children
          - **Vector** · `VECTOR` · 3×11 · ×2
          - **Vector** · `VECTOR` · 14×16
          - **Vector** · `VECTOR` · 3×5
          - **Vector** · `VECTOR` · 6×1
          - **Vector** · `VECTOR` · 8×1
      - **Packages** · `TEXT` · 55×16 · “Packages”
      - **Chevron** · `INSTANCE` · 16×16 · horizontal row, gap 10px, padding 2px · instance of Chevron
    - **Line 55** · `VECTOR` · 40×0
    - **button** · `INSTANCE` · 118×32 · horizontal row · instance of button
    - **Line 56** · `VECTOR` · 40×0
    - **profile hamburger** · `FRAME` · 62×27 · vertical stack, gap 10px, padding 1/5/1/5px · 1 children
      - **Frame 1000004623** · `FRAME` · 42×19 · horizontal row, gap 7px · 2 children
        - **Hamburger** · `INSTANCE` · 16×16 · vertical stack, gap 10px, padding 6/5/6/5px · instance of Hamburger
        - **avatar** · `GROUP` · 19×19 · 2 children
          - **Clip 5** · `VECTOR` · 19×18
          - **Group 1857** · `GROUP` · 18×18 · 1 children
            - **Unisex Broker/Developer Avatar** · `GROUP` · 18×18
              - _…and 3 more_

### .Rent property cards

Page: SRP · 6 variants

Reuse: import existing — key `5ef7c3c18a81918c9db7b4e00bab19ec0d5721a9` · node `3476:7516`

| Property | Values |
|---|---|
| Device | Desktop, Mobile |
| Type | Rent, Rent - premium locked, Rent - premium locked (experiment) |

Sample variant structure:

- **Device=Desktop, Type=Rent - premium locked** · `COMPONENT` · 872×238 · horizontal row, gap 16px, padding 8/16/8/8px · 2 children
  - **Frame 2087324489** · `FRAME` · 366×222 · vertical stack · 3 children
    - **top sllr deatils** · `GROUP` · 366×32 · 3 children
      - **100+ buyers contacted** · `FRAME` · 141×12 · horizontal row, gap 4px
      - **Frame 1000004629** · `FRAME` · 34×34 · horizontal row, gap 8px · 1 children
        - **Object-diff-sllr-imgs** · `GROUP` · 34×34 · 11 children
          - **Rectangle 4294** · `RECTANGLE` · 34×34
          - **Rectangle 4295** · `RECTANGLE` · 34×34
          - **m3m** · `RECTANGLE` · 34×34
          - **Puranik Builders pvt. ltd.** · `RECTANGLE` · 34×34
          - **ashley** · `RECTANGLE` · 34×34
          - **Onkar Real Estate Solutions** · `RECTANGLE` · 32×32
          - **A&A associates** · `RECTANGLE` · 34×34
          - **Amit Raghav** · `RECTANGLE` · 34×34
          - **Hukam Singh** · `RECTANGLE` · 34×34
          - **Rahul Mishra** · `RECTANGLE` · 34×34
          - **image 13** · `RECTANGLE` · 22×21
      - **Frame 2087324488** · `FRAME` · 366×32 · vertical stack, gap 10px, padding 4/217/4/4px · 2 children
        - **Frame 1000004632** · `FRAME` · 145×24 · horizontal row, gap 8px · 2 children
          - **sllr img** · `GROUP` · 24×24 · 3 children
            - **expert pro img** · `GROUP` · 24×24
              - _…and 1 more_
            - **Object-name initials** · `GROUP` · 26×26
              - _…and 3 more_
            - **Object-diff-sllr-imgs** · `GROUP` · 26×26
              - _…and 9 more_
          - **Ashok Kumar Gahlot** · `TEXT` · 113×16 · “M3M India Pvt. Ltd.”
        - **locality champion** · `FRAME` · 112×12 · horizontal row, gap 4px · 3 children
          - **Group** · `GROUP` · 12×12 · 2 children
            - **Rectangle 4134** · `RECTANGLE` · 12×12
            - **Group** · `GROUP` · 12×12
              - _…and 2 more_
          - **Ashok Kumar Gahlot** · `TEXT` · 96×12 · “Locality Champion”
          - **group_12** · `GROUP` · 10×10 · 2 children
            - **Path** · `VECTOR` · 10×10
            - **Shape** · `BOOLEAN_OPERATION` · 1×6
              - _…and 2 more_
    - **Rectangle 6156** · `RECTANGLE` · 366×190
    - **tag cloud** · `FRAME` · 165×20 · horizontal row, gap 4px · 7 children
      - **tags_new-launch** · `INSTANCE` · 51×16 · horizontal row · instance of tags_new-launch
      - **.tag_RERA** · `INSTANCE` · 47×16 · horizontal row, gap 4px, padding 2/4/2/4px · instance of .tag_RERA
      - **.tag_W_new-launch** · `INSTANCE` · 47×16 · horizontal row, gap 4px, padding 2/8/2/4px · instance of .tag_W_new-launch
      - **.tag_custom** · `INSTANCE` · 33×16 · horizontal row, padding 2/8/2/8px · instance of .tag_custom
      - **.tag_verified** · `INSTANCE` · 85×20 · horizontal row, gap 4px, padding 2/4/2/4px · instance of .tag_verified
      - **.tag_verified** · `INSTANCE` · 76×20 · horizontal row, gap 4px, padding 2/4/2/4px · instance of .tag_verified
      - **.tag_3D-view** · `INSTANCE` · 65×16 · horizontal row, gap 4px, padding 2/4/2/4px · instance of .tag_3D-view
  - **Frame 1000004293** · `FRAME` · 466×222 · vertical stack, gap 16px, padding 8/0/8/0px · 4 children
    - **Frame 1000003771** · `FRAME` · 413×72 · vertical stack, gap 8px · 2 children
      - **Frame 1000003770** · `FRAME` · 413×48 · vertical stack, gap 8px · 2 children
        - **tag cloud** · `FRAME` · 104×20 · horizontal row, gap 4px · 4 children
          - **.tag_custom** · `INSTANCE` · 104×20 · horizontal row, padding 2/8/2/8px · instance of .tag_custom
          - **.tag_custom** · `INSTANCE` · 60×20 · horizontal row, gap 4px, padding 2/8/2/4px · instance of .tag_custom
          - **.tag_custom** · `INSTANCE` · 68×20 · horizontal row, gap 4px, padding 2/4/2/4px · instance of .tag_custom · ×2
        - **Frame 1000004652** · `FRAME` · 348×20 · vertical stack, gap 8px · 1 children
          - **Frame 2552** · `FRAME` · 348×20 · horizontal row, gap 8px · 3 children
            - **Amar Serenity** · `TEXT` · 348×20 · “Without Brokerage 1RK Flat for rent in J block”
            - **.tag_ratings** · `INSTANCE` · 42×24 · horizontal row, gap 2px, padding 2/4/2/4px · instance of .tag_ratings
            - **RERA tag** · `GROUP` · 50×20
              - _…and 1 more_
      - **by Amar Realtors** · `TEXT` · 413×16 · “2 BHK Builder Floor in Paschim Vihar”
    - **Frame 2552** · `FRAME` · 339×34 · horizontal row, gap 16px · 5 children
      - **Frame 2555** · `FRAME` · 103×34 · vertical stack, gap 2px · 2 children
        - **by Amar Realtors** · `TEXT` · 103×16 · “₹11,000”
        - **by Amar Realtors** · `TEXT` · 103×16 · “see price breakup”
      - **Vector 839** · `VECTOR` · 0×34
      - **Frame 2556** · `FRAME` · 70×34 · vertical stack, gap 2px · 2 children
        - **by Amar Realtors** · `TEXT` · 70×16 · “500 sq.ft”
        - **by Amar Realtors** · `TEXT` · 70×16 · “Builtup area”
      - **Vector 838** · `VECTOR` · 0×34
      - **Frame 2557** · `FRAME` · 102×34 · vertical stack, gap 2px · 2 children
        - **by Amar Realtors** · `TEXT` · 102×16 · “Semi furnished”
        - **by Amar Realtors** · `TEXT` · 102×16 · “Furnishing status”
    - **tertiary data** · `GROUP` · 474×16 · 1 children
      - **Frame 1000003760** · `FRAME` · 474×16 · horizontal row, gap 8px · 4 children
        - **Apr, 2020** · `TEXT` · 61×16 · “Amenities:”
        - **Apr, 2022** · `TEXT` · 20×16 · “Lift”
        - **Ellipse 674** · `ELLIPSE` · 4×4
        - **Apr, 2021** · `TEXT` · 44×16 · “Parking”
    - **Frame 2087324486** · `FRAME` · 466×40 · horizontal row, gap 212px · 2 children
      - **by Amar Realtors** · `TEXT` · 55×32 · “Updated 6 d ago”
      - **btm ctas** · `FRAME` · 241×40 · horizontal row, gap 16px · 3 children
        - **button** · `INSTANCE` · 102×40 · horizontal row · instance of button
        - **CTA** · `FRAME` · 40×40 · vertical stack, gap 10px, padding 6/10/6/10px · 1 children
          - **Shortlist** · `INSTANCE` · 16×14 · instance of Shortlist
        - **button** · `INSTANCE` · 185×40 · horizontal row · instance of button

### .DIY free contact

Page: SRP · 8 variants

Reuse: import existing — key `899a7a4957dc8410424c5d8714fbb8f95fff4efa` · node `3475:14793`

| Property | Values |
|---|---|
| Property 1 | 1 consumed, Default, Locked, Only 1 contact given |
| Device | Desktop, Mobile |

Sample variant structure:

- **Property 1=Default, Device=Desktop** · `COMPONENT` · 880×64 · horizontal row, gap 12px, padding 12/16/12/12px · 2 children
  - **Frame 2147261494** · `FRAME` · 68×40 · horizontal row, gap -4.000000476837158px · 2 children
    - **Vector** · `VECTOR` · 32×40
    - **Ellipse 586** · `ELLIPSE` · 40×40
  - **Frame 2147261493** · `FRAME` · 772×40 · horizontal row, gap 4px · 2 children
    - **Frame 2147261494** · `FRAME` · 197×40 · vertical stack, gap 4px · 2 children
      - **Other Charges** · `TEXT` · 197×20 · “Contact owners for FREE!”
      - **Frame 2147261495** · `FRAME` · 131×16 · horizontal row, gap 4px · 2 children
        - **Other Charges** · `TEXT` · 9×16 · “2”
        - **Other Charges** · `TEXT` · 118×16 · “contacts available”
    - **button** · `INSTANCE` · 78×16 · horizontal row · instance of button

### .Individual tab

Page: SRP · 2 variants

Reuse: import existing — key `083ae9a461d2ace417cc474075e7666019acf918` · node `3403:8429`

| Property | Values |
|---|---|
| State | default, selected |

Sample variant structure:

- **State=default** · `COMPONENT` · 48×51 · vertical stack, gap 8px · 2 children
  - **Frame 2147261491** · `FRAME` · 48×40 · vertical stack, gap 4px, padding 0/12/0/12px · 2 children
    - **All** · `INSTANCE` · 24×24 · instance of All
    - **All** · `TEXT` · 24×12 · “All”
  - **Rectangle 4266** · `VECTOR` · 48×3

### Rent tabs

Page: SRP · 1 variants

Reuse: import existing — key `3fcf484470c335b9a38c83c39ff0c103afe06d85` · node `3404:8957`

| Property | Values |
|---|---|
| Property 1 | Default |

Sample variant structure:

- **Property 1=Default** · `COMPONENT` · 563×59 · horizontal row, gap 4px, padding 8/16/0/16px · 7 children
  - **.Individual tab** · `INSTANCE` · 48×51 · vertical stack, gap 8px · instance of .Individual tab
  - **.Individual tab** · `INSTANCE` · 57×51 · vertical stack, gap 8px · instance of .Individual tab
  - **.Individual tab** · `INSTANCE` · 86×51 · vertical stack, gap 8px · instance of .Individual tab
  - **.Individual tab** · `INSTANCE` · 64×51 · vertical stack, gap 8px · instance of .Individual tab
  - **.Individual tab** · `INSTANCE` · 76×51 · vertical stack, gap 8px · instance of .Individual tab
  - **.Individual tab** · `INSTANCE` · 100×51 · vertical stack, gap 8px · instance of .Individual tab
  - **.Individual tab** · `INSTANCE` · 76×51 · vertical stack, gap 8px · instance of .Individual tab

### Rent bottom navigation

Page: SRP · 1 variants

Reuse: import existing — key `d20e55557735c9b0bf63514d0edfe49ba514505c` · node `3477:9442`

| Property | Values |
|---|---|
| Property 1 | Default |

Sample variant structure:

- **Property 1=Default** · `COMPONENT` · 360×60 · horizontal row, gap 12px, padding 0/16/0/16px · 4 children
  - **Nav items** · `FRAME` · 73×60 · vertical stack, padding 8/8/4/8px · 2 children
    - **Buy** · `FRAME` · 24×24 · 1 children
      - **House** · `INSTANCE` · 20×20 · instance of House
    - **Text** · `FRAME` · 42×24 · horizontal row, gap 4px, padding 4px · 1 children
      - **Filter** · `TEXT` · 34×16 · “Home”
  - **Nav items** · `FRAME` · 73×60 · vertical stack, padding 8/8/4/8px · 2 children
    - **Premium - default** · `INSTANCE` · 24×24 · instance of Premium - default
    - **Text** · `FRAME` · 60×24 · horizontal row, gap 4px, padding 4px · 1 children
      - **Filter** · `TEXT` · 52×16 · “Premium”
  - **Nav items** · `FRAME` · 73×60 · vertical stack, padding 8/8/4/8px · 2 children
    - **Icons** · `FRAME` · 24×24 · 1 children
      - **Suggestions** · `GROUP` · 20×20 · 2 children
        - **Rectangle 1167** · `RECTANGLE` · 20×20
        - **Group 1909** · `GROUP` · 19×19 · 1 children
          - **Group 1910** · `GROUP` · 19×19 · 3 children
            - **Rectangle 1170** · `VECTOR` · 16×16
            - **Rectangle 1171** · `VECTOR` · 14×14
            - **Fill 3** · `VECTOR` · 8×8
    - **Text** · `FRAME` · 80×24 · horizontal row, gap 4px, padding 4px · 1 children
      - **Filter** · `TEXT` · 72×16 · “Suggestions”
  - **Nav items** · `FRAME` · 73×60 · vertical stack, padding 8/8/4/8px · 2 children
    - **Icons** · `FRAME` · 24×24 · 1 children
      - **Saved** · `GROUP` · 20×20 · 2 children
        - **Rectangle 1168** · `RECTANGLE` · 20×20
        - **Vector** · `VECTOR` · 20×18
    - **Text** · `FRAME` · 44×24 · horizontal row, gap 4px, padding 4px · 1 children
      - **Filter** · `TEXT` · 36×16 · “Saved”

### Filters

Page: SRP · 6 variants

Reuse: import existing — key `f9dbec5865531fc4ae09dad2ce60431b13f8245c` · node `2307:13003`

| Property | Values |
|---|---|
| Property 1 | Filter: On, Filters: Off, Clear filters, Icon: Filter on, Sorting, Icon: Filter off |

Sample variant structure:

- **Property 1=Filter: On** · `COMPONENT` · 92×32 · horizontal row, gap 4px, padding 8px · 2 children
  - **Frame 2087324398** · `FRAME` · 56×16 · horizontal row, gap 4px · 1 children
    - **Filters (3)** · `TEXT` · 56×16 · “Filters (3)”
  - **Filter: Clicks** · `INSTANCE` · 16×16 · instance of Filter: Clicks

### Project add ons

Page: SRP · 4 variants

Reuse: import existing — key `afdd9751162a72424badc10803e0b5e67df1af4a` · node `2557:5037`

| Property | Values |
|---|---|
| Property 1 | City hotspots: Off, New in "X": Off, City hotspots: On, New in "X": On |

Sample variant structure:

- **Property 1=City hotspots: Off** · `COMPONENT` · 117×32 · horizontal row, gap 8px, padding 6/8/6/8px · 3 children
  - **Frame 2087324896** · `FRAME` · 20×20 · horizontal row, gap 10px, padding 2px
  - **Fire** · `INSTANCE` · 16×16 · instance of Fire
  - **Frame 2087324398** · `FRAME` · 77×20 · horizontal row, gap 4px · 1 children
    - **City hotspots** · `TEXT` · 77×16 · “City hotspots”

### SRP / Android / Buy / Left coulmn / States

Page: SRP · 2 variants

Reuse: import existing — key `a5ec716633bfc334f1684c3dfe178818cc5efe54` · node `2770:12350`

| Property | Values |
|---|---|
| Property 1 | Default, Active |

Sample variant structure:

- **Property 1=Active** · `COMPONENT` · 120×48 · horizontal row, gap 10px, padding 0/0/0/16px · 2 children
  - **Frame 2147261484** · `FRAME` · 48×16 · horizontal row, gap 8px · 1 children
    - **Budget** · `TEXT` · 48×16 · “Budget”
  - **Frame 2147261486** · `FRAME` · 25×48 · horizontal row, gap 12px · 2 children
    - **Frame 2147261485** · `FRAME` · 9×16 · horizontal row, gap 8px · 1 children
      - **2** · `TEXT` · 9×16 · “2”
    - **Rectangle 6160** · `RECTANGLE` · 4×48

### Checkboxes

Page: SRP · 4 variants

Reuse: import existing — key `e2bff02159d3d1237067dbaadab6974ff885dbf5` · node `2772:12844`

| Property | Values |
|---|---|
| Property 1 | Checkboxes: Checked, Checkboxes: Un-checked, Radio |
| Property 2 | On, Off |

Sample variant structure:

- **Property 1=Checkboxes: Checked, Property 2=On** · `COMPONENT` · 16×16 · 1 children
  - **_Checkbox base** · `INSTANCE` · 16×16 · instance of _Checkbox base

### SRP / Android / Buy / Right column

Page: SRP · 22 variants

Reuse: import existing — key `6612a059bf1550c3395913b77631ae2c8bb9005f` · node `2772:12590`

| Property | Values |
|---|---|
| Property 1 | Android |
| Property 2 | Buy |
| Property 3 | Right coulmn |
| Property 4 | BHK, Type, Status, Listed by, Amenities, Deal type, Age, Developer, Furnishing, Facing, Photos, RERA, Launched, Verified, Layout, Added on, Budget, Area, Lease type (Rent), Availability, Possession, Bathrooms |

Sample variant structure:

- **Property 1=Android, Property 2=Buy, Property 3=Right coulmn, Property 4=BHK** · `COMPONENT` · 240×400 · vertical stack, gap 16px, padding 16px · 2 children
  - **Heading** · `INSTANCE` · 28×16 · horizontal row · instance of Heading
  - **Frame 2147261467** · `FRAME` · 208×336 · vertical stack · 7 children
    - **Checkbox** · `INSTANCE` · 208×48 · vertical stack, gap 8px, padding 16/0/16/0px · instance of Checkbox · ×7

### SRP / Filters/ Left drawer

Page: SRP · 2 variants

Reuse: import existing — key `f7742a32d73be0788a64a70b5a4aec6500321332` · node `2771:12490`

| Property | Values |
|---|---|
| Property 1 | Android |
| Property 2 | Buy, Rent |
| Property 3 | Left coulmn |

Sample variant structure:

- **Property 1=Android, Property 2=Buy, Property 3=Left coulmn** · `COMPONENT` · 120×912 · vertical stack · 19 children
  - **SRP / Android / Buy / Left coulmn / States** · `INSTANCE` · 120×48 · horizontal row, gap 10px, padding 0/0/0/16px · instance of SRP / Android / Buy / Left coulmn / States
  - **SRP / Android / Buy / Left coulmn / States** · `INSTANCE` · 120×48 · horizontal row, gap 10px, padding 16px · instance of SRP / Android / Buy / Left coulmn / States · ×18

### Checkbox

Page: SRP · 2 variants

Reuse: import existing — key `e06760879d206a53bd0e8a33011d34e8be336e6d` · node `2772:12994`

| Property | Values |
|---|---|
| Property 1 | Checkbox options, Checkbox options: Disabled |

Sample variant structure:

- **Property 1=Checkbox options** · `COMPONENT` · 208×48 · vertical stack, gap 8px, padding 16/0/16/0px · 2 children
  - **Frame 2147261468** · `FRAME` · 208×16 · horizontal row, gap 24px · 2 children
    - **Studio** · `TEXT` · 168×16 · “Studio”
    - **Checkboxes** · `INSTANCE` · 16×16 · instance of Checkboxes
  - **Sikka Karnam Greens,** · `TEXT` · 184×16 · “Sub-heading”

### SRP / FIlters

Page: SRP · 3 variants

Reuse: import existing — key `874a0645a0d6168c67dd9d339bc1fbceeb13343d` · node `2799:6978`

| Property | Values |
|---|---|
| Property 1 | Android |
| Property 2 | Buy, Rent |
| Property 3 | Filters, Skeleton |

Sample variant structure:

- **Property 1=Android, Property 2=Buy, Property 3=Filters** · `COMPONENT` · 360×996 · vertical stack · 4 children
  - **Navigation/Status bar** · `INSTANCE` · 360×40 · horizontal row · instance of Navigation/Status bar
  - **Search bar** · `FRAME` · 360×44 · horizontal row, gap 12px, padding 8/16/12/16px · 2 children
    - **Frame 2087324881** · `FRAME` · 173×24 · horizontal row, gap 8px · 2 children
      - **Back** · `INSTANCE` · 24×24 · instance of Back
      - **Filter** · `TEXT` · 36×16 · “Filter”
    - **button** · `INSTANCE` · 48×16 · horizontal row · instance of button
  - **Frame 2147261461** · `FRAME` · 360×912 · horizontal row · 2 children
    - **SRP / Filters/ Left drawer** · `INSTANCE` · 120×912 · vertical stack · instance of SRP / Filters/ Left drawer
    - **SRP / Android / Buy / Right column** · `INSTANCE` · 240×634 · vertical stack, gap 24px, padding 16px · instance of SRP / Android / Buy / Right column
  - **Bottom bar** · `FRAME` · 360×80 · horizontal row, gap 8px, padding 16px · 1 children
    - **Frame 2087324893** · `FRAME` · 328×48 · vertical stack, gap 12px · 1 children
      - **Frame 2087324792** · `FRAME` · 328×48 · vertical stack, gap 16px · 1 children
        - **button** · `INSTANCE` · 328×48 · horizontal row · instance of button

### Filter: Clicks

Page: SRP · 2 variants

Reuse: import existing — key `81207cd6dbb7e327038acd749ef6e80aee27c5c1` · node `2879:7266`

| Property | Values |
|---|---|
| Property 1 | Clear, Filter |

Sample variant structure:

- **Property 1=Filter** · `COMPONENT` · 16×16 · 1 children
  - **Vector** · `VECTOR` · 8×4

### Search

Page: Search · 3 variants

Reuse: import existing — key `86951e34af6745fd6441a6054f422a5f5075cb51` · node `2120:7593`

| Property | Values |
|---|---|
| Property 1 | Search |
| Property 2 | Default, Focus, Disabled |

Sample variant structure:

- **Property 1=Search, Property 2=Default** · `COMPONENT` · 412×168 · vertical stack, gap 20px, padding 0/0/16/0px · 2 children
  - **Navigation/Status bar** · `INSTANCE` · 412×40 · horizontal row · instance of Navigation/Status bar
  - **Frame 2087324871** · `FRAME` · 412×92 · vertical stack, gap 20px, padding 0/16/0/16px · 2 children
    - **App** · `FRAME` · 380×24 · horizontal row, gap 257.875px · 2 children
      - **Frame 2087324881** · `FRAME` · 173×24 · horizontal row, gap 8px · 2 children
        - **Back** · `INSTANCE` · 24×24 · instance of Back
        - **Buy** · `TEXT` · 27×16 · “Buy”
      - **Frame 2087324856** · `FRAME` · 89×16 · horizontal row · 2 children
        - **Frame 2087324855** · `FRAME` · 73×16 · horizontal row, gap 4px · 2 children
          - **Frame** · `FRAME` · 16×16 · 1 children
            - **Vector** · `VECTOR` · 11×14
          - **Mumbai** · `TEXT` · 53×16 · “Mumbai”
        - **ChevronRight** · `INSTANCE` · 16×16 · instance of ChevronRight
    - **App** · `FRAME` · 380×48 · horizontal row, gap 8px, padding 16px · 3 children
      - **Frame** · `FRAME` · 24×24 · 1 children
        - **Vector** · `VECTOR` · 20×20
      - **Text Input** · `FRAME` · 273×23 · horizontal row · 2 children
        - **Component 13** · `INSTANCE` · 1×18 · horizontal row, gap 10px · instance of Component 13
        - **3BHK with a balco (Animated)** · `TEXT` · 194×16 · “3BHK with a balco (Animated)”
      - **Frame 2147261484** · `FRAME` · 33×24 · horizontal row, gap 8px · 2 children
        - **Container** · `FRAME` · 1×24
        - **Frame** · `FRAME` · 24×24 · 2 children
          - **Vector** · `VECTOR` · 8×14
          - **Vector** · `VECTOR` · 15×22

### Search / Home

Page: Search · 10 variants

Reuse: import existing — key `8bf64751f7c9abe61366147a8648949231fbe4af` · node `2120:9392`

| Property | Values |
|---|---|
| Property 1 | Buy, No results, Project, Rent, Commercial, PG, Plot, Open search, Skeleton loader, Commercial (M-web) |

Sample variant structure:

- **Property 1=No results** · `COMPONENT` · 360×800 · vertical stack, gap 16px · 2 children
  - **Search** · `INSTANCE` · 360×168 · vertical stack, gap 20px, padding 0/0/16/0px · instance of Search
  - **Frame 2087324786** · `FRAME` · 360×366 · vertical stack, gap 16px, padding 0/16/74/16px · 2 children
    - **UI Card** · `FRAME` · 328×156 · vertical stack, gap 16px, padding 12/12/16/12px · 3 children
      - **Frame 2087324845** · `FRAME` · 304×16 · horizontal row, gap 8px · 2 children
        - **Frame** · `FRAME` · 16×16 · 2 children
          - **Vector** · `VECTOR` · 12×12
          - **Vector** · `VECTOR` · 13×13
        - **Frame 2087324840** · `FRAME` · 280×16 · horizontal row, gap 8px · 1 children
          - **Oops, no results found! Try asking Houzy** · `TEXT` · 273×16 · “Oops, no results found! Try asking Houzy”
      - **Frame 2087324878** · `FRAME` · 460×32 · vertical stack, gap 12px · 1 children
        - **Frame 2087324876** · `FRAME` · 460×32 · horizontal row, gap 12px · 2 children
          - **Frame 2087324873** · `FRAME` · 224×32 · vertical stack, gap 12px · 1 children
            - **Frame 2087324871** · `FRAME` · 224×32 · horizontal row, gap 12px
              - _…and 1 more_
          - **Frame 2087324875** · `FRAME` · 224×32 · vertical stack, gap 12px · 1 children
            - **Frame 2087324871** · `FRAME` · 224×32 · horizontal row, gap 12px
              - _…and 1 more_
      - **AI Search** · `INSTANCE` · 304×48 · vertical stack, gap -100px · instance of AI Search
    - **Frame 2087324796** · `FRAME` · 328×120 · vertical stack, gap 16px, padding 16px · 2 children
      - **Frame 2087324846** · `FRAME` · 296×16 · horizontal row, gap 8px · 2 children
        - **Frame** · `FRAME` · 16×16 · 2 children
          - **Vector** · `VECTOR` · 4×4
          - **Vector** · `VECTOR` · 14×9
        - **Frame 2087324840** · `FRAME` · 272×16 · horizontal row, gap 8px · 1 children
          - **Popular localities** · `TEXT` · 116×16 · “Popular localities”
      - **Frame 2087324807** · `FRAME` · 364×56 · horizontal row, gap 12px, padding 0/40/0/0px · 3 children
        - **Frame 2087324853** · `FRAME` · 120×56 · vertical stack, gap -12px · 1 children
          - **Frame 2087324307** · `FRAME` · 120×56 · vertical stack, gap 8px, padding 8/8/8/12px · 2 children
            - **Frame 2087324846** · `FRAME` · 52×16 · horizontal row
              - _…and 2 more_
            - **Text ->** · `TEXT` · 75×16 · “₹30.2K/sq.ft.”
        - **Frame 2087324305** · `FRAME` · 120×56 · vertical stack, gap 8px, padding 8/8/8/12px · 2 children
          - **Frame 2087324846** · `FRAME` · 100×16 · horizontal row · 1 children
            - **Text ->** · `TEXT` · 80×16 · “DLF Avenue”
          - **Text ->** · `TEXT` · 100×16 · “₹30.2K/sq.ft.”
        - **Frame 2087324855** · `FRAME` · 120×56 · vertical stack, gap 8px, padding 8/8/8/12px · 2 children
          - **Frame 2087324846** · `FRAME` · 100×16 · horizontal row, gap 12px · 2 children
            - **Text ->** · `TEXT` · 66×16 · “Hadaspur”
            - **Frame** · `FRAME` · 16×16
              - _…and 1 more_
          - **Text ->** · `TEXT` · 100×16 · “₹30.2K/sq.ft.”

### Search / SRP

Page: Search · 3 variants

Reuse: import existing — key `88f74931edc32527d1cc18327ea90e7949de6786` · node `2236:4251`

| Property | Values |
|---|---|
| Property 1 | Add locality, No results found, Max selection |

Sample variant structure:

- **Property 1=Add locality** · `COMPONENT` · 360×800 · vertical stack, gap 16px · 2 children
  - **Search** · `INSTANCE` · 360×168 · vertical stack, gap 20px, padding 0/0/16/0px · instance of Search
  - **Frame 2087324786** · `FRAME` · 360×422 · vertical stack, gap 16px, padding 0/16/74/16px · 1 children
    - **Frame 2087324691** · `FRAME` · 328×348 · vertical stack, gap 16px, padding 16px · 2 children
      - **Frame 2087324384** · `FRAME` · 296×252 · vertical stack, gap 16px · 3 children
        - **Frame 2087324411** · `FRAME` · 296×68 · vertical stack, gap 16px · 2 children
          - **Frame 2087324840** · `FRAME` · 296×16 · horizontal row, gap 8px · 1 children
            - **Localities added** · `TEXT` · 110×16 · “Localities added”
          - **Frame 2087324408** · `FRAME` · 296×36 · horizontal row, gap 12px · 2 children
            - **locality_pills** · `FRAME` · 97×36 · horizontal row, gap 8px, padding 0/8/0/8px
              - _…and 2 more_
            - **locality_pills** · `FRAME` · 137×36 · horizontal row, gap 8px, padding 0/8/0/8px
              - _…and 2 more_
        - **Line 1** · `LINE` · 296×0
        - **Frame 2087324412** · `FRAME` · 296×152 · vertical stack, gap 12px · 3 children
          - **Frame 2087324840** · `FRAME` · 296×16 · horizontal row, gap 8px · 1 children
            - **Localities like Mira Road** · `TEXT` · 161×16 · “Localities like Mira Road”
          - **Frame 2087324883** · `FRAME` · 483×56 · horizontal row, gap 12px · 3 children
            - **Frame 2087324307** · `FRAME` · 153×56 · vertical stack, gap 8px, padding 8/12/8/12px
              - _…and 1 more_
            - **Frame 2087324859** · `FRAME` · 153×56 · vertical stack, gap 8px, padding 8/12/8/12px
              - _…and 1 more_
            - **Frame 2087324860** · `FRAME` · 153×56 · vertical stack, gap 8px, padding 8/12/8/12px
              - _…and 1 more_
          - **Frame 2087324884** · `FRAME` · 483×56 · horizontal row, gap 12px · 3 children
            - **Frame 2087324307** · `FRAME` · 153×56 · vertical stack, gap 8px, padding 8/12/8/12px
              - _…and 1 more_
            - **Frame 2087324858** · `FRAME` · 153×56 · vertical stack, gap 8px, padding 8/12/8/12px
              - _…and 1 more_
            - **Frame 2087324859** · `FRAME` · 153×56 · vertical stack, gap 8px, padding 8/12/8/12px
              - _…and 1 more_
      - **.demand_primary** · `INSTANCE` · 296×48 · horizontal row, gap 4px, padding 0/16/0/16px · instance of .demand_primary

### Recent searches

Page: Search · 2 variants

Reuse: import existing — key `7172ff729bc4096a522902cdd5bb31658a57f0f4` · node `2373:8522`

| Property | Values |
|---|---|
| Property 1 | 100%, Experiment |

Sample variant structure:

- **Property 1=Experiment** · `COMPONENT` · 220×52 · horizontal row, gap 8px, padding 8/12/8/8px · 2 children
  - **ClockCounterClockwise** · `INSTANCE` · 16×16 · instance of ClockCounterClockwise
  - **Frame 2147261366** · `FRAME` · 176×36 · vertical stack, gap 4px · 2 children
    - **Frame 2147261367** · `FRAME` · 176×16 · horizontal row, gap 4px · 3 children
      - **Text ->** · `TEXT` · 84×16 · “Malviya Nagar”
      - **Container** · `FRAME` · 1×12
      - **Text ->** · `TEXT` · 83×16 · “100+ new”
    - **Text ->** · `TEXT` · 120×16 · “Buy 2BHK under 3 Cr”

### Imagine / Search / m-web

Page: Search · 8 variants

Reuse: import existing — key `398912b4bbef7b2a59d99a38532d6748c893dd4a` · node `3136:8973`

| Property | Values |
|---|---|
| Property 1 | Buy, Project, Rent, Commercial, PG, Plot, Open search, Skeleton loader |

Sample variant structure:

- **Property 1=Buy** · `COMPONENT` · 360×800 · vertical stack · 2 children
  - **Imagine / Search** · `INSTANCE` · 360×160 · vertical stack, gap 20px, padding 0/0/12/0px · instance of Imagine / Search
  - **Frame 2087324786** · `FRAME` · 360×932 · vertical stack, gap 4px, padding 0/0/80/0px · 6 children
    - **Recent searches** · `INSTANCE` · 360×132 · vertical stack, gap 12px, padding 16px · instance of Recent searches
    - **Frame 2147261373** · `INSTANCE` · 360×132 · vertical stack, gap 12px, padding 16px · instance of Frame 2147261373
    - **Popular landmarks** · `INSTANCE` · 360×164 · vertical stack, gap 12px, padding 16px · instance of Popular landmarks
    - **Hotspots** · `INSTANCE` · 360×160 · vertical stack, gap 12px, padding 16px · instance of Hotspots
    - **Trending projects** · `INSTANCE` · 360×160 · vertical stack, gap 12px, padding 16px · instance of Trending projects
    - **Explore nearby** · `INSTANCE` · 360×84 · vertical stack, gap 10px, padding 16px · instance of Explore nearby

### Imagine / Search

Page: Search · 4 variants

Reuse: import existing — key `3ccfa1e491a3352450589c450b06665becb9f958` · node `3136:8790`

| Property | Values |
|---|---|
| Property 1 | Search |
| Property 2 | Default, Focus, Disabled, Commercial/m-web |

Sample variant structure:

- **Property 1=Search, Property 2=Default** · `COMPONENT` · 412×160 · vertical stack, gap 20px, padding 0/0/12/0px · 2 children
  - **Navigation/Status bar** · `INSTANCE` · 412×40 · horizontal row · instance of Navigation/Status bar
  - **Frame 2087324871** · `FRAME` · 412×88 · vertical stack, gap 16px, padding 0/16/0/16px · 2 children
    - **App** · `FRAME` · 380×24 · horizontal row, gap 257.875px · 2 children
      - **Frame 2087324881** · `FRAME` · 173×32 · horizontal row, gap 8px · 2 children
        - **Frame 2147261474** · `FRAME` · 32×32 · horizontal row, gap 10px, padding 4px · 1 children
          - **Frame 2147261471** · `FRAME` · 24×24 · horizontal row, gap 10px · 1 children
            - **ArrowLeft** · `INSTANCE` · 24×24 · instance of ArrowLeft
        - **Buy** · `TEXT` · 26×20 · “Buy”
      - **Frame 2087324856** · `FRAME` · 96×20 · horizontal row · 2 children
        - **Frame 2087324855** · `FRAME` · 78×20 · horizontal row, gap 4px · 2 children
          - **MapPin** · `INSTANCE` · 18×18 · instance of MapPin
          - **Mumbai** · `TEXT` · 56×20 · “Mumbai”
        - **CaretRight** · `INSTANCE` · 18×18 · instance of CaretRight
    - **App** · `FRAME` · 380×48 · horizontal row, gap 8px, padding 16/12/16/12px · 3 children
      - **MagnifyingGlass** · `INSTANCE` · 24×24 · instance of MagnifyingGlass
      - **Text Input** · `FRAME` · 282×23 · horizontal row · 2 children
        - **Component 13** · `INSTANCE` · 1×18 · horizontal row, gap 10px · instance of Component 13
        - **3BHK with a balco (Animated)** · `TEXT` · 197×20 · “3BHK with a balco (Animated)”
      - **Frame 2147261484** · `FRAME` · 32×24 · horizontal row, gap 8px · 2 children
        - **Line 11** · `LINE` · 24×0
        - **Frame** · `FRAME` · 24×24 · 2 children
          - **Vector** · `VECTOR` · 8×14
          - **Vector** · `VECTOR` · 15×22

### Checkboxes/radio

Page: Search · 4 variants

Reuse: import existing — key `621112ded3890344ebcde1121d555bb6356cd019` · node `3194:15906`

| Property | Values |
|---|---|
| Property 1 | Checkboxes: Checked, Checkboxes: Un-checked, Radio |
| Property 2 | On, Off |

Sample variant structure:

- **Property 1=Checkboxes: Checked, Property 2=On** · `COMPONENT` · 16×16 · 1 children
  - **_Checkbox base** · `INSTANCE` · 16×16 · instance of _Checkbox base

### Imagine/Search / SRP

Page: Search · 4 variants

Reuse: import existing — key `90817a6e3899d9e9130973f146fc732440cd3bc6` · node `3605:2728`

| Property | Values |
|---|---|
| Property 1 | Add locality, No results found, Max selection, No match found |

Sample variant structure:

- **Property 1=Add locality** · `COMPONENT` · 360×800 · vertical stack · 2 children
  - **Imagine / Search** · `INSTANCE` · 360×160 · vertical stack, gap 20px, padding 0/0/12/0px · instance of Imagine / Search
  - **Frame 2147261476** · `FRAME` · 360×640 · vertical stack, gap 4px · 2 children
    - **Hotspots** · `FRAME` · 360×108 · vertical stack, gap 12px, padding 16px · 2 children
      - **Frame 2087324845** · `FRAME` · 328×20 · horizontal row, gap 8px · 1 children
        - **Frame 2087324840** · `FRAME` · 328×20 · horizontal row, gap 8px · 1 children
          - **Localities added** · `TEXT` · 109×20 · “Localities added”
      - **Frame 2087324807** · `FRAME` · 326×44 · horizontal row, gap 12px, padding 0/40/0/0px · 1 children
        - **Frame 2147261477** · `FRAME` · 286×44 · horizontal row, gap 12px · 2 children
          - **Filters** · `FRAME` · 115×44 · horizontal row, gap 8px, padding 12px · 2 children
            - **Frame 2087324398** · `FRAME` · 67×20 · horizontal row, gap 4px
              - _…and 1 more_
            - **XCircle** · `INSTANCE` · 16×16 · instance of XCircle
          - **Filters** · `FRAME` · 159×44 · horizontal row, gap 8px, padding 12px · 2 children
            - **Frame 2087324398** · `FRAME` · 111×20 · horizontal row, gap 4px
              - _…and 1 more_
            - **XCircle** · `INSTANCE` · 16×16 · instance of XCircle
    - **Top developers** · `FRAME` · 360×536 · vertical stack, gap 12px, padding 16px · 4 children
      - **Frame 2087324845** · `FRAME` · 328×20 · horizontal row, gap 8px · 1 children
        - **Frame 2087324840** · `FRAME` · 328×20 · horizontal row, gap 8px · 1 children
          - **Similar localities** · `TEXT` · 107×20 · “Similar localities”
      - **Frame 2087324860** · `FRAME` · 364×64 · horizontal row, gap 12px · 2 children
        - **Frame 2087324131** · `FRAME` · 208×64 · horizontal row, gap 4px, padding 12px · 1 children
          - **Frame 2147261479** · `FRAME` · 184×40 · horizontal row, gap 12px · 2 children
            - **Frame 2147261480** · `FRAME` · 132×40 · vertical stack, gap 4px
              - _…and 2 more_
            - **Frame 2147261481** · `FRAME` · 40×40 · horizontal row, gap 10px, padding 8/10/8/10px
              - _…and 1 more_
        - **Frame 2087324134** · `FRAME` · 204×64 · horizontal row, gap 4px, padding 12px · 1 children
          - **Frame 2147261479** · `FRAME` · 180×40 · horizontal row, gap 12px · 2 children
            - **Frame 2147261480** · `FRAME` · 132×40 · vertical stack, gap 4px
              - _…and 2 more_
            - **Frame 2147261481** · `FRAME` · 36×40 · horizontal row, gap 10px, padding 8/10/8/10px
              - _…and 1 more_
      - **Frame 2087324861** · `FRAME` · 364×64 · horizontal row, gap 12px · 2 children
        - **Frame 2087324131** · `FRAME` · 208×64 · horizontal row, gap 4px, padding 12px · 1 children
          - **Frame 2147261479** · `FRAME` · 184×40 · horizontal row, gap 12px · 2 children
            - **Frame 2147261480** · `FRAME` · 132×40 · vertical stack, gap 4px
              - _…and 2 more_
            - **Frame 2147261482** · `FRAME` · 40×40 · horizontal row, gap 10px, padding 8/10/8/10px
              - _…and 1 more_
        - **Frame 2087324133** · `FRAME` · 204×64 · horizontal row, gap 4px, padding 12px · 1 children
          - **Frame 2147261479** · `FRAME` · 180×40 · horizontal row, gap 12px · 2 children
            - **Frame 2147261480** · `FRAME` · 132×40 · vertical stack, gap 4px
              - _…and 2 more_
            - **Frame 2147261481** · `FRAME` · 36×40 · horizontal row, gap 10px, padding 8/10/8/10px
              - _…and 1 more_
      - **Button** · `INSTANCE` · 328×48 · horizontal row, gap 8px, padding 12/20/12/20px · instance of Button

### Nearby properties - rent

Page: Homepage · 5 variants

Reuse: import existing — key `ba0d6a5e0ad14c6822abcde56ea651c65315ec9f` · node `2479:3449`

| Property | Values |
|---|---|
| Property 1 | Added, New value, contacted, No image case, no multi connect |

Sample variant structure:

- **Property 1=New value** · `COMPONENT` · 140×252 · horizontal row, gap 8px · 1 children
  - **Frame 1000004825** · `FRAME` · 140×252 · vertical stack, gap 8px, padding 8px · 1 children
    - **Frame 1000004838** · `FRAME` · 124×236 · vertical stack, gap 16px · 2 children
      - **Frame 1000004837** · `FRAME` · 124×188 · vertical stack, gap 8px · 3 children
        - **Frame 1000004824** · `FRAME` · 124×100 · vertical stack, gap 10px, padding 4px · 2 children
          - **Tags** · `INSTANCE` · 112×16 · horizontal row · instance of Tags
          - **Frame 1000004884** · `FRAME` · 112×92 · vertical stack, gap 10px
        - **Frame 1000004822** · `FRAME` · 124×36 · vertical stack, gap 4px · 2 children
          - **₹3.79 Cr - ₹14.72 Cr** · `TEXT` · 124×16 · “₹37,000/ month”
          - **mktd by Godrej Realt** · `TEXT` · 124×16 · “3 BHK apartment”
        - **Frame 1000004823** · `FRAME` · 124×36 · vertical stack, gap 4px · 2 children
          - **mktd by Godrej Realt** · `TEXT` · 124×16 · “Sector 44, New Gurgaon ”
          - **mktd by Godrej Realt** · `TEXT` · 124×16 · “1800 sq.ft. · Semi furnished”
      - **button** · `FRAME` · 124×32 · horizontal row · 1 children
        - **button** · `INSTANCE` · 124×32 · horizontal row · instance of button

### Nearby property - multiconnect -map view

Page: Homepage · 5 variants

Reuse: import existing — key `e90a1e8f1468832041c2d98e2a6220c36719e574` · node `2604:645`

| Property | Values |
|---|---|
| Property 1 | Default, selected, post connect, no image, No multi connect |

Sample variant structure:

- **Property 1=Default** · `COMPONENT` · 327×76 · vertical stack, gap 10px, padding 8px · 1 children
  - **Frame 1000004865** · `FRAME` · 311×60 · horizontal row, gap 8px · 2 children
    - **Frame 1000004824** · `FRAME` · 60×60 · vertical stack, gap 10px, padding 4px
    - **Frame 1000004864** · `FRAME` · 243×60 · vertical stack, gap 8px · 2 children
      - **Frame 1000004863** · `FRAME` · 243×36 · vertical stack, gap 4px · 2 children
        - **Frame 1000004891** · `FRAME` · 243×16 · 2 children
          - **2,3,4 BHK Sector 91,** · `TEXT` · 162×16 · “₹5.41 L/month”
          - **checkbox** · `INSTANCE` · 16×16 · horizontal row, gap 8px · instance of checkbox
        - **mktd by Godrej Realt** · `TEXT` · 243×16 · “3 BHK Apartment, Sector 93, Gurgaon”
      - **Frame 1000004862** · `FRAME` · 162×16 · vertical stack, gap 4px · 1 children
        - **₹3.79 Cr - ₹14.72 Cr** · `TEXT` · 243×16 · “Semi - Furnished”

### Main Content

Page: Homepage · 2 variants

Reuse: import existing — key `fc1f66251e9e0a9fb44bc81b6459deae6c8f1315` · node `2914:7559`

| Property | Values |
|---|---|
| Property 1 | New user, With recent searchs |

Sample variant structure:

- **Property 1=New user** · `COMPONENT` · 360×792 · vertical stack, gap 20px, padding 51/16/16/16px · 5 children
  - **Header Container** · `INSTANCE` · 328×40 · horizontal row, gap 87px · instance of Header Container
  - **Category Section** · `FRAME` · 328×149 · vertical stack, gap 1px, padding 0/0/16/0px · 2 children
    - **Category Row** · `FRAME` · 328×64 · vertical stack · 1 children
      - **Category Items Container** · `FRAME` · 356×64 · horizontal row · 6 children
        - **Category Item** · `FRAME` · 60×64 · vertical stack, gap 8px, padding 12/0/12/0px · 2 children
          - **Category Icon Container** · `GROUP` · 9×16 · 4 children
            - **Stroke 8** · `VECTOR` · 5×0
            - **Stroke 9** · `VECTOR` · 5×0
            - **Stroke 10** · `VECTOR` · 3×8
            - **Fill 5** · `BOOLEAN_OPERATION` · 9×16
              - _…and 2 more_
          - **Category Text** · `TEXT` · 23×16 · “Buy”
        - **Category Item** · `FRAME` · 60×64 · vertical stack, gap 8px, padding 12/0/12/0px · 2 children
          - **Category Item Icon Container** · `GROUP` · 14×16 · 10 children
            - **Category Item Icon Full** · `GROUP` · 9×16
              - _…and 2 more_
            - **Vector 833** · `VECTOR` · 4×12
            - **Vector 834** · `VECTOR` · 0×0
            - **Vector 835** · `VECTOR` · 0×0
            - **Vector 836** · `VECTOR` · 0×0
            - **Vector 837** · `VECTOR` · 0×0
            - **Vector 838** · `VECTOR` · 0×0
            - **Vector 839** · `VECTOR` · 0×0
            - **Vector 840** · `VECTOR` · 0×0
            - **Vector 841** · `VECTOR` · 0×0
          - **Category Text** · `TEXT` · 41×16 · “Project”
        - **Category Item** · `FRAME` · 52×64 · vertical stack, gap 8px, padding 12/0/12/0px · 2 children
          - **Mask group** · `GROUP` · 16×16 · 2 children
            - **Category Icon Background** · `RECTANGLE` · 16×16
            - **Subtract** · `BOOLEAN_OPERATION` · 9×17
              - _…and 2 more_
          - **Category Text** · `TEXT` · 27×16 · “Rent”
        - **Category Item** · `FRAME` · 52×64 · vertical stack, gap 8px, padding 12/0/12/0px · 2 children
          - **Mask group** · `GROUP` · 16×16 · 2 children
            - **Category Icon Background** · `RECTANGLE` · 16×16
            - **Category Icon Full** · `GROUP` · 15×20
              - _…and 4 more_
          - **Category Text** · `TEXT` · 23×16 · “Plot”
        - **Category Item** · `FRAME` · 80×64 · vertical stack, gap 8px, padding 12/0/12/0px · 1 children
          - **Category Item Full Icon** · `FRAME` · 80×40 · vertical stack, gap 8px · 2 children
            - **Mask group** · `GROUP` · 16×16
              - _…and 2 more_
            - **Category Text** · `TEXT` · 67×16 · “Commercial”
        - **Category Item** · `FRAME` · 52×64 · vertical stack, gap 8px, padding 12/16/12/16px · 1 children
          - **Category Icon Container** · `FRAME` · 16×40 · vertical stack, gap 8px · 2 children
            - **Mask group** · `GROUP` · 16×16
              - _…and 2 more_
            - **Category Text** · `TEXT` · 16×16 · “PG”
    - **Search Section** · `FRAME` · 328×68 · vertical stack, gap 8px, padding 16/16/0/16px · 1 children
      - **Search Bar** · `FRAME` · 296×52 · horizontal row, padding 0/8/0/8px · 2 children
        - **Search Text** · `TEXT` · 205×16 · “Search city, locality, landmark...”
        - **Group 56** · `GROUP` · 32×32 · 1 children
          - **Frame 2087324383** · `FRAME` · 32×32 · horizontal row, gap 10px, padding 6px · 1 children
            - **Frame** · `FRAME` · 20×20
              - _…and 2 more_
  - **Mask group** · `GROUP` · 328×182 · 3 children
    - **arihant group-02 1** · `RECTANGLE` · 328×182
    - **Screenshot 2026-04-07 at 5.32.03 PM 1** · `RECTANGLE` · 328×182
    - **Screenshot 2026-04-07 at 5.35.42 PM 1** · `RECTANGLE` · 328×182
  - **Recommendations Section** · `GROUP` · 502×294 · 9 children
    - **Recommendations Title** · `TEXT` · 202×20 · “Recommendations for you”
    - **See All Link** · `TEXT` · 40×16 · “See All”
    - **Section Title** · `TEXT` · 281×16 · “Personalised property recommendations in Delhi”
    - **Property Image** · `RECTANGLE` · 247×240
    - **Property Icon Section** · `GROUP` · 231×0 · 3 children
      - **Vector 66** · `VECTOR` · 73×0
      - **Vector 68** · `VECTOR` · 73×0
      - **Vector 67** · `VECTOR` · 73×0
    - **Opus Golf Couse Road** · `TEXT` · 198×16 · “Opus”
    - **₹ 2.5 Cr - ₹ 3.5 Cr** · `TEXT` · 132×20 · “₹ 2.5 Cr - ₹ 3.5 Cr”
    - **Opus Golf Couse Road** · `TEXT` · 198×16 · “Golf Couse Road, Gurgaon”
    - **Property Card Container** · `GROUP` · 247×240 · 1 children
      - **Property Card** · `GROUP` · 247×240 · 3 children
        - **Bitmap** · `RECTANGLE` · 247×240
        - **Property Card Background** · `RECTANGLE` · 247×240
        - **Property Card Content** · `GROUP` · 231×224 · 4 children
          - **Property Icon Container** · `GROUP` · 231×0 · 5 children
            - **Vector 65** · `VECTOR` · 73×0
            - **Vector 66** · `VECTOR` · 73×0
            - **Vector 68** · `VECTOR` · 73×0
            - **Vector 69** · `VECTOR` · 48×0
            - **Vector 67** · `VECTOR` · 73×0
          - **Opus Golf Couse Road** · `TEXT` · 198×16 · “Opus”
          - **₹ 2.5 Cr - ₹ 3.5 Cr** · `TEXT` · 132×20 · “₹ 2.5 Cr - ₹ 3.5 Cr”
          - **Opus Golf Couse Road** · `TEXT` · 198×16 · “Golf Couse Road, Gurgaon”
  - **Status** · `INSTANCE` · 360×40 · horizontal row, gap 4px, padding 0/16/0/16px · instance of Status

### .simple-tabs_home-search

Page: Homepage · 4 variants

Reuse: import existing — key `49c0247b25afc2a35f879f1668544b1bebbee21e` · node `2735:2673`

| Property | Values |
|---|---|
| state | default, hovered, pressed, selected |

Sample variant structure:

- **state=default** · `COMPONENT` · 37×22 · vertical stack, gap 4px · 2 children
  - **Label** · `TEXT` · 31×16 · “Label”
  - **Rectangle 6231** · `RECTANGLE` · 37×2

### city name

Page: Homepage · 5 variants

Reuse: import existing — key `125915e3e960b15d3e08903052a74d4da3e02043` · node `2735:1976`

| Property | Values |
|---|---|
| Property 1 | Default, hover state, dd-item, dd-item-hover, selected |

Sample variant structure:

- **Property 1=Default** · `COMPONENT` · 85×24 · horizontal row, gap 10px, padding 4px · 1 children
  - **Ahmedababd** · `TEXT` · 77×16 · “Ahmedababd”

### popular city pill

Page: Homepage · 3 variants

Reuse: import existing — key `c7e0c8a769e80311ce08a95584925b4557971d07` · node `2735:1989`

| Property | Values |
|---|---|
| State | Hover, Default, Selected |

Sample variant structure:

- **State=Default** · `COMPONENT` · 136×40 · vertical stack, gap 10px, padding 8px · 1 children
  - **Frame 1000004780** · `FRAME` · 63×24 · horizontal row, gap 8px · 2 children
    - **Delhi** · `INSTANCE` · 24×24 · instance of Delhi
    - **Delhi** · `TEXT` · 31×16 · “Delhi”

### Search

Page: Homepage · 1 variants

Reuse: import existing — key `c61e38c032d9291ee28590d1c7a7e4d56ce3bcc1` · node `3089:8608`

| Property | Values |
|---|---|
| Property 1 | Search |

Sample variant structure:

- **Property 1=Search** · `COMPONENT` · 722×204 · vertical stack · 2 children
  - **Frame 2087324427** · `FRAME` · 722×88 · vertical stack, gap 24px, padding 16/0/0/0px · 1 children
    - **Frame 2087324389** · `FRAME` · 722×72 · vertical stack · 2 children
      - **Frame 6** · `FRAME` · 722×72 · vertical stack, gap 10px, padding 0/24/0/24px · 1 children
        - **Frame 5** · `FRAME` · 674×72 · horizontal row, gap 8px · 6 children
          - **Homepage** · `INSTANCE` · 106×72 · vertical stack, gap 8px, padding 8/0/0/0px · instance of Homepage · ×6
      - **Frame 2087324390** · `FRAME` · 722×0 · vertical stack · 1 children
        - **Line 1** · `LINE` · 722×0
  - **Frame 2087324426** · `FRAME` · 722×116 · vertical stack, gap 16px, padding 24px · 3 children
    - **Search bar** · `INSTANCE` · 674×68 · horizontal row, gap 8px, padding 12/12/12/16px · instance of Search bar
    - **Frame 2087324433** · `FRAME` · 674×430 · vertical stack, gap 8px · 11 children
      - **Search hover** · `INSTANCE` · 674×50 · horizontal row, gap 8px, padding 8/16/8/0px · instance of Search hover
      - **Line 1** · `LINE` · 674×0
      - **Search hover** · `INSTANCE` · 674×50 · horizontal row, gap 8px, padding 8/16/8/0px · instance of Search hover
      - **Line 2** · `LINE` · 674×0
      - **Search hover** · `INSTANCE` · 674×50 · horizontal row, gap 8px, padding 8/16/8/0px · instance of Search hover
      - **Line 3** · `LINE` · 674×0
      - **Search hover** · `INSTANCE` · 674×50 · horizontal row, gap 8px, padding 8/16/8/0px · instance of Search hover
      - **Line 4** · `LINE` · 674×0
      - **Search hover** · `INSTANCE` · 674×50 · horizontal row, gap 8px, padding 8/16/8/0px · instance of Search hover · ×3
    - **Frame 2147261368** · `FRAME` · 468×64 · horizontal row, gap 16px · 2 children
      - **Recent searches block** · `FRAME` · 226×64 · horizontal row, gap 8px, padding 12px · 2 children
        - **ClockCounterClockwise** · `INSTANCE` · 18×18 · instance of ClockCounterClockwise
        - **Frame 2147261366** · `FRAME` · 176×40 · vertical stack, gap 8px · 2 children
          - **Text ->** · `TEXT` · 141×16 · “Buy 2BHK under 3 Cr”
          - **Frame 2147261367** · `FRAME` · 176×16 · horizontal row, gap 8px · 3 children
            - **Text ->** · `TEXT` · 93×16 · “5 new this week”
            - **Container** · `FRAME` · 1×12
            - **Text ->** · `TEXT` · 66×16 · “Malviya Nagar”
      - **Recent searches block** · `FRAME` · 226×64 · horizontal row, gap 8px, padding 12px · 2 children
        - **ClockCounterClockwise** · `INSTANCE` · 18×18 · instance of ClockCounterClockwise
        - **Frame 2147261366** · `FRAME` · 176×40 · vertical stack, gap 8px · 2 children
          - **Text ->** · `TEXT` · 141×16 · “Buy 2BHK under 3 Cr”
          - **Frame 2147261367** · `FRAME` · 176×16 · horizontal row, gap 8px · 1 children
            - **Text ->** · `TEXT` · 176×16 · “Malviya Nagar”

### Headers

Page: Homepage · 9 variants

Reuse: import existing — key `2712b4e7fca3c2dcc413a961e6e01298b0ca8690` · node `3089:7861`

| Property | Values |
|---|---|
| Property 1 | Buyers, Sellers, Services, Tenants, Header: Logged out, Header: Logged in, Scroll, SRP Header, PDP: Scroll |

Sample variant structure:

- **Property 1=Buyers** · `COMPONENT` · 1280×448 · vertical stack · 2 children
  - **Headers** · `INSTANCE` · 1280×64 · horizontal row, padding 16/24/16/24px · instance of Headers
  - **Frame 2087324395** · `FRAME` · 1280×384 · horizontal row, gap 48px, padding 24/48/24/48px · 7 children
    - **Frame 2087324396** · `FRAME` · 200×336 · vertical stack, gap 16px · 2 children
      - **Header menu titles** · `INSTANCE` · 200×20 · horizontal row, gap 10px, padding 0/16/0/16px · instance of Header menu titles
      - **Frame 2087324401** · `FRAME` · 200×300 · vertical stack, gap 12px · 6 children
        - **Header menu list** · `INSTANCE` · 200×40 · vertical stack, gap 8px, padding 12/16/12/16px · instance of Header menu list
        - **Header menu list** · `INSTANCE` · 200×40 · vertical stack, gap 8px, padding 12/16/12/16px · instance of Header menu list · ×4
        - **Component 14** · `INSTANCE` · 200×40 · vertical stack, gap 8px, padding 12/16/12/16px · instance of Component 14
    - **Line 2** · `LINE` · 336×0
    - **Frame 2087324403** · `FRAME` · 200×336 · vertical stack, gap 16px · 2 children
      - **Header menu titles** · `INSTANCE` · 200×20 · horizontal row, gap 10px, padding 0/16/0/16px · instance of Header menu titles
      - **Frame 2087324401** · `FRAME` · 200×300 · vertical stack, gap 12px · 6 children
        - **Header menu list** · `INSTANCE` · 200×40 · vertical stack, gap 8px, padding 12/16/12/16px · instance of Header menu list · ×5
        - **Component 14** · `INSTANCE` · 200×40 · vertical stack, gap 8px, padding 12/16/12/16px · instance of Component 14
    - **Line 5** · `LINE` · 336×0
    - **Frame 2087324404** · `FRAME` · 200×336 · vertical stack, gap 16px · 2 children
      - **Header menu titles** · `INSTANCE` · 200×20 · horizontal row, gap 10px, padding 0/16/0/16px · instance of Header menu titles
      - **Frame 2087324401** · `FRAME` · 200×300 · vertical stack, gap 12px · 6 children
        - **Header menu list** · `INSTANCE` · 200×40 · vertical stack, gap 8px, padding 12/16/12/16px · instance of Header menu list · ×5
        - **Component 14** · `INSTANCE` · 200×40 · vertical stack, gap 8px, padding 12/16/12/16px · instance of Component 14
    - **Line 6** · `LINE` · 336×0
    - **Frame 2087324405** · `FRAME` · 200×336 · vertical stack, gap 16px · 2 children
      - **Header menu titles** · `INSTANCE` · 200×20 · horizontal row, gap 10px, padding 0/16/0/16px · instance of Header menu titles
      - **Frame 2087324401** · `FRAME` · 200×300 · vertical stack, gap 12px · 6 children
        - **Header menu list** · `INSTANCE` · 200×40 · vertical stack, gap 8px, padding 12/16/12/16px · instance of Header menu list · ×5
        - **Component 14** · `INSTANCE` · 200×40 · vertical stack, gap 8px, padding 12/16/12/16px · instance of Component 14

### Header / Menu

Page: Homepage · 2 variants

Reuse: import existing — key `a882c5e216b1d30ae2b2eec0904318ef226e33e1` · node `3089:7515`

| Property | Values |
|---|---|
| Property 1 | Default, Hover |

Sample variant structure:

- **Property 1=Default** · `COMPONENT` · 79×40 · horizontal row, gap 10px, padding 12/16/12/16px · 1 children
  - **Buyers** · `TEXT` · 47×16 · “Buyers”

### Header menu list

Page: Homepage · 2 variants

Reuse: import existing — key `0ac37004fb5142317ad2b750eb59ec311edf37db` · node `3089:7525`

| Property | Values |
|---|---|
| Property 1 | Default, Hover |

Sample variant structure:

- **Property 1=Hover** · `COMPONENT` · 200×40 · vertical stack, gap 8px, padding 12/16/12/16px · 2 children
  - **Frame 2087324409** · `FRAME` · 31×16 · horizontal row, gap 8px · 2 children
    - **House** · `INSTANCE` · 16×16 · instance of House
    - **Flats** · `TEXT` · 31×16 · “Flats”
  - **Sub** · `TEXT` · 26×16 · “Sub”

### Search tabs

Page: Homepage · 2 variants

Reuse: import existing — key `3b0f676b48189eaaaafe41a159e80d8dccd4b1eb` · node `3101:5837`

| Property | Values |
|---|---|
| Property 1 | Search, Component 14 |
| Property 2 | Tabs |
| Property 3 | Active, Inactive |

Sample variant structure:

- **Property 1=Search, Property 2=Tabs, Property 3=Active** · `COMPONENT` · 74×40 · vertical stack, padding 12/24/12/24px · 1 children
  - **Buy** · `TEXT` · 26×16 · “Buy”

### Homepage

Page: Homepage · 2 variants

Reuse: import existing — key `0389f4fdc311b43507979a8ac3872a5065f34c8a` · node `3135:5516`

| Property | Values |
|---|---|
| Property 1 | Search |
| Property 2 | Tabs |
| Property 3 | Active, Inactive |

Sample variant structure:

- **Property 1=Search, Property 2=Tabs, Property 3=Active** · `COMPONENT` · 96×72 · vertical stack, gap 8px, padding 8/0/0/0px · 2 children
  - **Frame 2087324393** · `FRAME` · 96×52 · vertical stack, gap 12px, padding 0/16/0/16px · 2 children
    - **House** · `INSTANCE` · 24×24 · instance of House
    - **Buy** · `TEXT` · 64×16 · “Buy”
  - **Rectangle 2** · `RECTANGLE` · 96×4

### Search hover

Page: Homepage · 2 variants

Reuse: import existing — key `7d45525fbadf454c36aac451c7b44b2fd2e4dac4` · node `3089:8593`

| Property | Values |
|---|---|
| Property 1 | Default, Hover |

Sample variant structure:

- **Property 1=Default** · `COMPONENT` · 674×42 · horizontal row, gap 8px, padding 4/16/4/0px · 2 children
  - **Frame 2087324443** · `FRAME` · 34×34 · horizontal row, gap 10px, padding 8px · 1 children
    - **MapPin** · `INSTANCE` · 18×18 · instance of MapPin
  - **Frame 2087324442** · `FRAME` · 616×16 · horizontal row, gap 8px · 2 children
    - **Frame 2087324933** · `FRAME` · 210×16 · horizontal row · 2 children
      - **2 BHK in Indranagar,** · `TEXT` · 138×16 · “2 BHK in Indranagar,”
      - **Bangalore** · `TEXT` · 72×16 · “Bangalore”
    - **Frame 2087324439** · `FRAME` · 28×16 · horizontal row, gap 8px · 1 children
      - **City** · `TEXT` · 28×16 · “City”

### Search bar

Page: Homepage · 2 variants

Reuse: import existing — key `30abb19e1143fecaf67476af9b27b8a9c5c34090` · node `3187:12955`

| Property | Values |
|---|---|
| Property 1 | Default search, Focused search |

Sample variant structure:

- **Property 1=Default search** · `COMPONENT` · 674×68 · horizontal row, gap 8px, padding 12/12/12/16px · 1 children
  - **Frame 2087324384** · `FRAME` · 646×44 · horizontal row, gap 12px · 2 children
    - **Component 12** · `FRAME` · 590×44 · horizontal row, gap 4px · 1 children
      - **What are you looking for?** · `TEXT` · 189×24 · “What are you looking for?”
    - **project-card__primary-action** · `FRAME` · 44×44 · horizontal row, gap 4px, padding 6/8/6/8px · 1 children
      - **MagnifyingGlass** · `INSTANCE` · 24×24 · instance of MagnifyingGlass

### Scroll search

Page: Homepage · 2 variants

Reuse: import existing — key `940de9b5021be1dcfd2b06c3a32f6cb7e0a81c27` · node `3188:13620`

| Property | Values |
|---|---|
| Property 1 | Scroll search, Scroll search open |

Sample variant structure:

- **Property 1=Scroll search** · `COMPONENT` · 689×48 · horizontal row, gap 12px, padding 8/8/8/16px · 2 children
  - **Frame 2147261375** · `FRAME` · 58×24 · horizontal row, gap 12px · 2 children
    - **Frame 2087324424** · `FRAME` · 46×16 · horizontal row, gap 4px · 2 children
      - **Frame 2087324425** · `FRAME` · 26×16 · horizontal row, gap 4px · 1 children
        - **Frame 2087324423** · `FRAME` · 26×16 · horizontal row, gap 10px · 1 children
          - **Buy** · `TEXT` · 26×16 · “Buy”
      - **CaretDown** · `INSTANCE` · 16×16 · instance of CaretDown
    - **Line 5** · `LINE` · 24×0
  - **Frame 2087324384** · `FRAME` · 595×32 · horizontal row, gap 400px · 2 children
    - **What are you looking for?** · `TEXT` · 170×16 · “What are you looking for?”
    - **project-card__primary-action** · `FRAME` · 32×32 · horizontal row, gap 2.909090757369995px, padding 4.363636016845703/5.81818151473999/4.363636016845703/5.81818151473999px · 1 children
      - **MagnifyingGlass** · `INSTANCE` · 17×17 · instance of MagnifyingGlass

### Component 15

Page: Homepage · 6 variants

Reuse: import existing — key `7509ed0315f09ac3333875571188dcd3a468d377` · node `3089:7808`

| Property | Values |
|---|---|
| Property 1 | Buy, Commericial, PG, Projects, Rent, Variant7 |

Sample variant structure:

- **Property 1=Buy** · `COMPONENT` · 1232×400 · horizontal row, gap 10px, padding 10/10/60/10px · 5 children
  - **Vector** · `VECTOR` · 625×402 · ×2
  - **Frame 2087324440** · `FRAME` · 346×99 · vertical stack, gap 24px · 3 children
    - **line-3** · `VECTOR` · 228×32
    - **Frame 2087324441** · `FRAME` · 196×45 · horizontal row, gap 10px · 1 children
      - **Buy Homes** · `TEXT` · 196×45 · “Buy Homes”
    - **The one worth coming home to** · `TEXT` · 346×30 · “The one worth coming home to”
  - **Rectangle 6114** · `RECTANGLE` · 220×220
  - **Rectangle 6115** · `RECTANGLE` · 220×220

### Banner

Page: Homepage · 2 variants

Reuse: import existing — key `13e6d478e12f1d9957f88ddc471f9283c30a1d7f` · node `3092:4653`

| Property | Values |
|---|---|
| Property 1 | Ad banner, Default banner |

Sample variant structure:

- **Property 1=Default banner** · `COMPONENT` · 1232×400 · horizontal row, gap 10px, padding 10/10/60/10px · 5 children
  - **Vector** · `VECTOR` · 625×402 · ×2
  - **Frame 2087324440** · `FRAME` · 346×99 · vertical stack, gap 24px · 3 children
    - **line-3** · `VECTOR` · 228×32
    - **Frame 2087324441** · `FRAME` · 196×45 · horizontal row, gap 10px · 1 children
      - **Buy Homes** · `TEXT` · 196×45 · “Buy Homes”
    - **The one worth coming home to** · `TEXT` · 346×30 · “The one worth coming home to”
  - **Rectangle 6114** · `RECTANGLE` · 220×220
  - **Rectangle 6115** · `RECTANGLE` · 220×220

### Input fields

Page: Login · 8 variants

Reuse: import existing — key `bb99713654e1f88cd01e9c745076463576b1cacd` · node `2009:235`

| Property | Values |
|---|---|
| Property 1 | Focus, Phone: Default, Error, Focus: Filled, Input field: OTP: Default, Text: Default, Input fields: Focus, Input field: OTP: Error |
| Property 2 | Input field |

Sample variant structure:

- **Property 1=Phone: Default, Property 2=Input field** · `COMPONENT` · 348×48 · horizontal row, padding 0/16/0/16px · 1 children
  - **Container** · `FRAME` · 157×46 · horizontal row, gap 12px, padding 0/12/0/0px · 3 children
    - **+91** · `TEXT` · 23×16 · “+91”
    - **Container** · `FRAME` · 1×20
    - **Frame 2087324794** · `FRAME` · 97×16 · horizontal row, gap 10px · 1 children
      - **Phone number** · `TEXT` · 97×16 · “Phone number”

### Mobile

Page: Login · 7 variants

Reuse: import existing — key `5c303b861f1f2effd88bde9f02583b6ced4d5fa0` · node `2009:277`

| Property | Values |
|---|---|
| Property 1 | Mobile: Details, Mobile: Login, Mobile: OTP, Mobile: Other ways, Bottom sheet:Login, Login bottom, Missing details |

Sample variant structure:

- **Property 1=Mobile: Login** · `COMPONENT` · 360×520 · vertical stack, gap 24px, padding 0/16/24/16px · 2 children
  - **Frame 2087324795** · `FRAME` · 328×211 · vertical stack, gap 12px · 2 children
    - **Frame 2087324792** · `FRAME` · 328×155 · vertical stack, gap -34px, padding 16/0/0/0px · 3 children
      - **Rectangle 6144** · `RECTANGLE` · 328×113
      - **Container** · `FRAME` · 60×60 · horizontal row · 1 children
        - **Image (Housing)** · `FRAME` · 48×48
      - **Component 15** · `INSTANCE` · 25×16 · instance of Component 15
    - **Frame 2087324865** · `FRAME` · 328×44 · vertical stack, gap 8px · 2 children
      - **Other Charges** · `TEXT` · 328×20 · “Log in or sign up to Housing”
      - **Frame 2087324868** · `FRAME` · 123×16 · horizontal row, gap 8px · 5 children
        - **Buy** · `TEXT` · 26×16 · “Buy”
        - **Ellipse 605** · `ELLIPSE` · 5×5
        - **Rent** · `TEXT` · 31×16 · “Rent”
        - **Ellipse 606** · `ELLIPSE` · 5×5
        - **Sell** · `TEXT` · 24×16 · “Sell”
  - **Frame 2087324893** · `FRAME` · 328×261 · vertical stack, gap 24px · 3 children
    - **Input fields** · `INSTANCE` · 328×48 · horizontal row, padding 0/16/0/16px · instance of Input fields
    - **Frame 2087324382** · `FRAME` · 328×16 · horizontal row, gap 8px · 2 children
      - **checkbox** · `INSTANCE` · 16×16 · horizontal row, gap 8px · instance of checkbox
      - **Frame 2087324912** · `FRAME` · 187×16 · horizontal row, gap 2px · 3 children
        - **Frame 2087324844** · `FRAME` · 100×16 · horizontal row, gap 4px · 1 children
          - **Frame 2087324407** · `FRAME` · 100×16 · horizontal row, gap 4px · 1 children
            - **Text ->** · `TEXT` · 100×16 · “Get updates on”
        - **Frame 2087324407** · `FRAME` · 67×16 · horizontal row, gap 4px · 1 children
          - **Text ->** · `TEXT` · 67×16 · “WhatsApp”
        - **Frame 2087324833** · `FRAME` · 16×16 · horizontal row, gap 1.1428570747375488px · 1 children
          - **WhatsApp_Logo_1** · `RECTANGLE` · 16×16
    - **Frame 2087324792** · `FRAME` · 328×149 · vertical stack, gap 16px · 3 children
      - **.demand_primary** · `INSTANCE` · 328×48 · horizontal row, gap 4px, padding 0/16/0/16px · instance of .demand_primary
      - **Container** · `FRAME` · 328×21 · horizontal row, gap 8px · 3 children
        - **Container** · `FRAME` · 148×1
        - **OR** · `TEXT` · 17×16 · “OR”
        - **Container** · `FRAME` · 148×1
      - **Group 1000004323** · `GROUP` · 328×48 · 1 children
        - **Group 1000004320** · `GROUP` · 328×48 · 1 children
          - **Frame 2087324573** · `FRAME` · 328×48 · horizontal row, gap 8px, padding 7/8/7/8px · 2 children
            - **Digital_Glyph_Green 1** · `FRAME` · 20×20
              - _…and 1 more_
            - **Continue with WhatsApp** · `TEXT` · 167×16 · “Continue with WhatsApp”

### Login

Page: Login · 3 variants

Reuse: import existing — key `a19c93a25fe180e4f579e653d6c446e7dc264bc4` · node `2009:424`

| Property | Values |
|---|---|
| Property 1 | Variant3, Initials, Placeholder |

Sample variant structure:

- **Property 1=Variant3** · `COMPONENT` · 95×36 · horizontal row, gap 8px, padding 0/12/0/12px · 3 children
  - **Login** · `TEXT` · 38×16 · “Login”
  - **Container** · `FRAME` · 1×20
  - **Frame** · `FRAME` · 16×16 · 3 children
    - **Vector** · `VECTOR` · 12×0 · ×3

### Component 15

Page: Login · 2 variants

Reuse: import existing — key `a3a7cdee785ce97bc05a9f68802707400a20f1e9` · node `2009:449`

| Property | Values |
|---|---|
| Property 1 | Close, Skip |

Sample variant structure:

- **Property 1=Skip** · `COMPONENT` · 25×16 · 1 children
  - **Skip** · `TEXT` · 25×16 · “Skip”

### Web

Page: Login · 4 variants

Reuse: import existing — key `558f62e88d4afc59426dd5ff5cabce54c1a8616a` · node `2009:454`

| Property | Values |
|---|---|
| Property 1 | Web: Details, Web: Login, Web: OTP, Web: OTP options |

Sample variant structure:

- **Property 1=Web: Login** · `COMPONENT` · 400×398 · vertical stack, gap 32px · 2 children
  - **States** · `FRAME` · 400×398 · vertical stack, gap 24px, padding 24px · 2 children
    - **Frame 2087324795** · `FRAME` · 352×206 · vertical stack, gap 12px · 2 children
      - **Frame 2087324792** · `FRAME` · 352×146 · vertical stack, gap -34px · 3 children
        - **Rectangle 6145** · `RECTANGLE` · 352×120
        - **Container** · `FRAME` · 60×60 · horizontal row · 1 children
          - **Image (Housing)** · `FRAME` · 48×48
        - **Skip** · `TEXT` · 25×16 · “Skip”
      - **Frame 2087324865** · `FRAME` · 352×48 · vertical stack, gap 8px · 2 children
        - **Other Charges** · `TEXT` · 352×20 · “Log in or sign up to Housing”
        - **Frame 2087324868** · `FRAME` · 135×20 · horizontal row, gap 8px · 5 children
          - **Buy** · `TEXT` · 30×20 · “Buy”
          - **Ellipse 605** · `ELLIPSE` · 5×5
          - **Rent** · `TEXT` · 36×20 · “Rent”
          - **Ellipse 606** · `ELLIPSE` · 5×5
          - **Sell** · `TEXT` · 27×20 · “Sell”
    - **Frame 2087324893** · `FRAME` · 352×120 · vertical stack, gap 24px · 2 children
      - **Input fields** · `INSTANCE` · 352×48 · horizontal row, padding 0/16/0/16px · instance of Input fields
      - **Frame 2087324792** · `FRAME` · 352×48 · vertical stack, gap 16px · 3 children
        - **button** · `INSTANCE` · 352×48 · horizontal row · instance of button
        - **Container** · `FRAME` · 296×21 · horizontal row, gap 8px · 3 children
          - **Container** · `FRAME` · 132×1
          - **OR** · `TEXT` · 17×16 · “OR”
          - **Container** · `FRAME` · 132×1
        - **Group 1000004323** · `GROUP` · 296×48 · 1 children
          - **Group 1000004320** · `GROUP` · 296×48 · 1 children
            - **Frame 2087324573** · `FRAME` · 296×48 · horizontal row, gap 8px, padding 7/8/7/8px
              - _…and 2 more_
  - **Close** · `INSTANCE` · 20×20 · instance of Close

### CRF / Property details

Page: CRF · 2 variants

Reuse: import existing — key `01e3047d18253e6c80d95857657e8d74c6c97e73` · node `2244:574`

| Property | Values |
|---|---|
| Property 1 | Default, Falback |

Sample variant structure:

- **Property 1=Default** · `COMPONENT` · 380×85 · vertical stack, gap 16px, padding 16px · 1 children
  - **Frame 2087324380** · `FRAME` · 348×53 · horizontal row, gap 12px · 2 children
    - **image/rounded** · `FRAME` · 53×53 · 1 children
      - **Rounded Rectangle** · `RECTANGLE` · 53×53
    - **Frame 2087324277** · `FRAME` · 283×53 · vertical stack, gap 8px · 3 children
      - **Frame 2087324801** · `FRAME` · 283×20 · vertical stack, gap 4px · 1 children
        - **Evolvus Phase 1, Sikanderpur** · `TEXT` · 283×20 · “Evolvus Phase 1, Sikanderpur”
      - **Container** · `FRAME` · 283×1
      - **Frame 2087324802** · `FRAME` · 283×16 · horizontal row, gap 8px · 3 children
        - **Frame 2087324407** · `FRAME` · 113×16 · horizontal row, gap 4px · 1 children
          - **Text ->** · `TEXT` · 113×16 · “₹2.5 Cr. - 4.53 Cr.”
        - **Ellipse 604** · `ELLIPSE` · 5×5
        - **Text ->** · `TEXT` · 149×16 · “Apartment, villa, villa, villa”

### OTP

Page: CRF · 4 variants

Reuse: import existing — key `f8bbcc62d73e7fc1bac23451a5c58e83a0ce04ba` · node `2244:982`

| Property | Values |
|---|---|
| Property 1 | Fetchin, Alternative, OTP Loading, OTP: Loading |

Sample variant structure:

- **Property 1=Alternative** · `COMPONENT` · 360×800 · vertical stack, gap 16px · 2 children
  - **Frame 2087324389** · `FRAME` · 360×56 · horizontal row, gap 10px, padding 16/0/16/0px · 1 children
    - **Frame 2087324139** · `FRAME` · 360×24 · horizontal row, gap 12px, padding 0/16/0/16px · 2 children
      - **ChevronLeft** · `INSTANCE` · 24×24 · instance of ChevronLeft
      - **Title** · `TEXT` · 131×20 · “Verify your phone”
  - **Frame 2087324786** · `FRAME` · 360×489 · vertical stack, gap 16px, padding 0/16/0/16px · 1 children
    - **Mobile** · `INSTANCE` · 360×489 · vertical stack, gap 24px, padding 16px · instance of Mobile

### Sellers notified variants

Page: CRF · 7 variants

Reuse: import existing — key `4a764a7803b7e9b0bb8d3b52fce4d0bdae742937` · node `2244:3527`

| Property | Values |
|---|---|
| Property 1 | Multiple sellers, Single seller, Resale, View more, Limit reached, Rent, DIY free contacts |

Sample variant structure:

- **Property 1=Multiple sellers** · `COMPONENT` · 380×241 · vertical stack, gap 16px · 3 children
  - **Frame 2087324812** · `FRAME` · 380×52 · horizontal row, gap 8px, padding 16px · 2 children
    - **Frame** · `FRAME` · 20×20 · 1 children
      - **Group 1000004682** · `GROUP` · 18×18 · 1 children
        - **Vector** · `VECTOR` · 18×18
    - **Frame 2087324812** · `FRAME` · 320×16 · vertical stack, gap 8px · 1 children
      - **Sellers notified, they may reach out soon** · `TEXT` · 274×16 · “Sellers notified, they may reach out soon”
  - **Frame 2087324300** · `FRAME` · 380×125 · vertical stack, gap 16px, padding 0/16/0/16px · 2 children
    - **Frame 2087324820** · `FRAME` · 348×40 · vertical stack, gap 8px · 2 children
      - **Evolvus Phase 1, Sikanderpur, MG Road, Haryana** · `TEXT` · 348×16 · “Evolvus Phase 1, Sikanderpur, MG Road, Haryana”
      - **Frame 2087324820** · `FRAME` · 348×16 · horizontal row, gap 8px · 3 children
        - **3BHK Apartment** · `TEXT` · 110×16 · “3BHK Apartment”
        - **Ellipse 605** · `ELLIPSE` · 5×5
        - **Frame 2087324409** · `FRAME` · 50×16 · horizontal row, gap 4px · 1 children
          - **Text ->** · `TEXT` · 50×16 · “₹2.5 Cr.”
    - **Frame 2087324273** · `FRAME` · 348×69 · vertical stack, gap 24px · 1 children
      - **Frame 2087324153** · `FRAME` · 348×69 · vertical stack, gap 14px · 1 children
        - **Frame 2087324127** · `FRAME` · 348×69 · vertical stack, gap 20px · 2 children
          - **Frame 2087324798** · `FRAME` · 348×1 · vertical stack, gap 8px · 1 children
            - **Container** · `FRAME` · 1×348
          - **Frame 2087324128** · `FRAME` · 348×48 · vertical stack, gap 20px · 1 children
            - **Frame 2087324836** · `FRAME` · 348×48 · horizontal row, gap 20px
              - _…and 2 more_
  - **Frame 2087324806** · `FRAME` · 380×32 · horizontal row, gap 4px, padding 8/0/8/0px · 2 children
    - **.demand_text_cta** · `INSTANCE` · 115×16 · horizontal row, gap 4px · instance of .demand_text_cta
    - **ChevronDown** · `INSTANCE` · 16×16 · instance of ChevronDown

### API delay

Page: CRF · 2 variants

Reuse: import existing — key `51e17bcd97144eedd5eabf642b115d2a17d19818` · node `2246:1067`

| Property | Values |
|---|---|
| Property 1 | API delay: Multiple sellers, API delay: Single seller |

Sample variant structure:

- **Property 1=API delay: Multiple sellers** · `COMPONENT` · 360×312 · vertical stack, gap 24px, padding 16px · 1 children
  - **Frame 2087324793** · `FRAME` · 328×280 · vertical stack, gap 24px · 2 children
    - **Frame 2087324795** · `FRAME` · 328×170 · vertical stack, gap 12px · 2 children
      - **Frame 2087324791** · `FRAME` · 328×138 · vertical stack, gap -34px · 2 children
        - **Rectangle 6144** · `RECTANGLE` · 328×113
        - **Container** · `FRAME` · 60×59 · horizontal row · 1 children
          - **Image (Housing)** · `FRAME` · 48×48
      - **Other Charges** · `TEXT` · 328×20 · “Getting you in touch with sellers…”
    - **Frame 2087324835** · `FRAME` · 328×86 · vertical stack, gap -71px · 3 children
      - **Container** · `FRAME` · 328×70 · horizontal row, padding 12px · 1 children
        - **Frame 2087324817** · `FRAME` · 167×44 · horizontal row, gap 16px · 2 children
          - **Rectangle 69** · `RECTANGLE` · 44×44
          - **Frame 2087324385** · `FRAME` · 107×36 · vertical stack, gap 4px · 2 children
            - **Frame 2087324819** · `FRAME` · 82×16 · horizontal row, gap 8px
              - _…and 1 more_
            - **Frame 2087324818** · `FRAME` · 107×16 · horizontal row, gap 8px
              - _…and 1 more_
      - **Container** · `FRAME` · 312×78 · horizontal row, padding 16px · 1 children
        - **Frame 2087324817** · `FRAME` · 165×44 · horizontal row, gap 16px · 2 children
          - **Rectangle 69** · `RECTANGLE` · 44×44
          - **Frame 2087324385** · `FRAME` · 105×44 · vertical stack, gap 8px · 2 children
            - **Frame 2087324819** · `FRAME` · 90×20 · horizontal row, gap 8px
              - _…and 1 more_
            - **Frame 2087324818** · `FRAME` · 105×16 · horizontal row, gap 8px
              - _…and 1 more_
      - **Container** · `FRAME` · 276×78 · horizontal row, padding 16px · 1 children
        - **Frame 2087324817** · `FRAME` · 165×44 · horizontal row, gap 16px · 2 children
          - **Rectangle 69** · `RECTANGLE` · 44×44
          - **Frame 2087324385** · `FRAME` · 105×44 · vertical stack, gap 8px · 2 children
            - **Frame 2087324819** · `FRAME` · 90×20 · horizontal row, gap 8px
              - _…and 1 more_
            - **Frame 2087324818** · `FRAME` · 105×16 · horizontal row, gap 8px
              - _…and 1 more_

### Details

Page: CRF · 3 variants

Reuse: import existing — key `15ad7683d11af3192b84eb1a4511a0849af5f686` · node `2016:273`

| Property | Values |
|---|---|
| Property 1 | PDP, Contact seller, Details provided |
| Property 2 | On PDP, Details missing |

Sample variant structure:

- **Property 1=PDP, Property 2=On PDP** · `COMPONENT` · 360×959 · vertical stack, gap 16px · 2 children
  - **Frame 2087324787** · `FRAME` · 360×56 · vertical stack, gap 10px, padding 16/0/16/0px · 1 children
    - **Frame 2087324139** · `FRAME` · 360×24 · horizontal row, gap 12px, padding 0/16/0/16px · 2 children
      - **Title** · `TEXT` · 87×20 · “Your details”
      - **Close** · `INSTANCE` · 24×24 · instance of Close
  - **Frame 2087324786** · `FRAME` · 360×870 · vertical stack, gap 16px, padding 0/16/0/16px · 2 children
    - **CRF / Property details** · `INSTANCE` · 328×85 · vertical stack, gap 16px, padding 16px · instance of CRF / Property details
    - **Frame 2087324688** · `FRAME` · 328×769 · vertical stack, gap 16px, padding 16px · 2 children
      - **Frame 2087324898** · `FRAME` · 296×487 · vertical stack, gap 16px · 7 children
        - **Frame 2087324277** · `FRAME` · 296×50 · vertical stack, gap 4px · 2 children
          - **Frame 2087324845** · `FRAME` · 142×24 · horizontal row, gap 4px · 1 children
            - **Frame 2087324798** · `FRAME` · 142×24 · horizontal row, gap 8px
              - _…and 1 more_
          - **Frame 2087324382** · `FRAME` · 296×22 · horizontal row, gap 4px · 2 children
            - **Frame 2087324808** · `FRAME` · 37×22 · horizontal row, gap -14px
              - _…and 3 more_
            - **Frame 2087324809** · `FRAME` · 241×16 · horizontal row, gap 4px
              - _…and 1 more_
        - **Content text** · `FRAME` · 296×128 · vertical stack, gap 16px · 2 children
          - **Default** · `INSTANCE` · 296×56 · horizontal row · instance of Default · ×2
        - **checkbox** · `FRAME` · 296×50 · horizontal row, gap 8px · 2 children
          - **check** · `FRAME` · 16×16 · 2 children
            - **vector** · `VECTOR` · 16×16
            - **vector** · `VECTOR` · 8×6
          - **Frame 1000003081** · `FRAME` · 272×50 · vertical stack, gap 2px · 3 children
            - **I agree to be contacted by Housing & other agents via** · `TEXT` · 272×32 · “I agree to be contacted by Housing & other agents via  ”
            - **Frame 2087324833** · `FRAME` · 272×16 · horizontal row, gap 2px
              - _…and 3 more_
            - **Description** · `TEXT` · 67×16 · “Description”
        - **button** · `INSTANCE` · 296×48 · horizontal row · instance of button
        - **button** · `FRAME` · 296×16 · horizontal row · 1 children
          - **.demand_text_cta** · `FRAME` · 198×16 · horizontal row, gap 4px · 3 children
            - **Call** · `INSTANCE` · 12×12 · instance of Call
            - **Edit phone +91 9711663070** · `TEXT` · 178×16 · “Edit phone +91 9711663070”
            - **Pen** · `INSTANCE` · 16×16 · instance of Pen
        - **Container** · `FRAME` · 296×21 · horizontal row, gap 8px · 3 children
          - **Container** · `FRAME` · 132×1
          - **OR** · `TEXT` · 17×16 · “OR”
          - **Container** · `FRAME` · 132×1
        - **Frame 2087324897** · `FRAME` · 296×78 · vertical stack, gap 12px · 2 children
          - **Paragraph** · `FRAME` · 296×16 · 1 children
            - **Use Google to fill details instead** · `TEXT` · 207×16 · “Use Google to fill details instead”
          - **Google details** · `INSTANCE` · 296×50 · horizontal row, gap 12px, padding 16/16/16/12px · instance of Google details
      - **Frame 2087324899** · `FRAME` · 296×33 · vertical stack, gap 16px · 2 children
        - **Container** · `FRAME` · 296×1 · horizontal row, gap 8px · 1 children
          - **Container** · `FRAME` · 296×1
        - **Frame 1000003081** · `FRAME` · 296×16 · vertical stack, gap 2px · 2 children
          - **Frame 2087324892** · `FRAME` · 287×16 · horizontal row, gap 2px · 2 children
            - **Frame 2087324833** · `FRAME` · 159×16 · horizontal row, gap 1px
              - _…and 1 more_
            - **Frame 2087324891** · `FRAME` · 126×16 · horizontal row, gap 2px
              - _…and 1 more_
          - **Description** · `TEXT` · 67×16 · “Description”

### Multi connect / cards

Page: CRF · 4 variants

Reuse: import existing — key `aa3fb01ab48e733f4143100e6ce6257c5764a84d` · node `2456:1502`

| Property | Values |
|---|---|
| Property 1 | Selected, Unselected, Contacted, Not contacted |

Sample variant structure:

- **Property 1=Unselected** · `COMPONENT` · 224×292 · vertical stack, gap 12px, padding 12px · 2 children
  - **Frame 2087324900** · `FRAME` · 200×36 · horizontal row, gap 57px · 2 children
    - **Frame 2087324897** · `FRAME` · 72×36 · horizontal row, gap 8px · 1 children
      - **Frame 2087324898** · `FRAME` · 72×36 · vertical stack, gap 4px · 1 children
        - **Frame 2087324902** · `FRAME` · 72×36 · horizontal row, gap 8px · 1 children
          - **Frame 2087324898** · `FRAME` · 72×36 · vertical stack, gap 4px · 2 children
            - **Text** · `TEXT` · 72×16 · “Arjun Patel”
            - **Frame 2087324818** · `FRAME` · 40×16 · horizontal row, gap 8px
              - _…and 1 more_
    - **Frame 2087324901** · `FRAME` · 24×36 · horizontal row, gap 10px, padding 0/0/0/8px · 1 children
      - **checkbox** · `INSTANCE` · 16×16 · horizontal row, gap 8px · instance of checkbox
  - **Content** · `GROUP` · 200×220 · 1 children
    - **Frame 2087324273** · `FRAME` · 200×220 · vertical stack, gap 24px · 1 children
      - **Frame 22** · `FRAME` · 200×220 · vertical stack, gap 16px · 1 children
        - **Content text** · `FRAME` · 200×220 · vertical stack, gap 12px · 1 children
          - **Frame 2087324380** · `FRAME` · 200×220 · vertical stack, gap 16px · 3 children
            - **Rectangle 6146** · `RECTANGLE` · 98×27
            - **image/rounded** · `FRAME` · 200×92
              - _…and 1 more_
            - **Frame 2087324278** · `FRAME` · 200×112 · vertical stack, gap 16px
              - _…and 2 more_

### mWeb-Free-Gallery

Page: Gallery · 2 variants

Reuse: import existing — key `173f3d591db459ab1ccdde25c96a6705209aed44` · node `2778:4998`

| Property | Values |
|---|---|
| Property 1 | Free-mWeb-Gallery, Free-mWeb-Gallery-AppInstall |

Sample variant structure:

- **Property 1=Free-mWeb-Gallery** · `COMPONENT` · 360×800 · 3 children
  - **Frame 2087324978** · `FRAME` · 360×2114 · vertical stack, gap 12px · 2 children
    - **Frame 2087324975** · `FRAME` · 360×1507 · vertical stack, gap -540px · 2 children
      - **Frame 2087324976** · `FRAME` · 360×1507 · vertical stack, gap 12px · 5 children
        - **Group 2116** · `GROUP` · 360×549 · 6 children
          - **ghcgd 2** · `RECTANGLE` · 360×549
          - **Polygon 5** · `VECTOR` · 42×36
          - **hgfhg 5** · `RECTANGLE` · 360×173
          - **Rectangle 19** · `RECTANGLE` · 360×173
          - **Group 1898** · `GROUP` · 116×16 · 2 children
            - **Property Details** · `TEXT` · 97×16 · “Property Details”
            - **Group 1895** · `GROUP` · 11×11
              - _…and 3 more_
          - **3D tour badge** · `GROUP` · 179×34 · 2 children
            - **Rectangle 3** · `VECTOR` · 179×34
            - **Group 1576** · `GROUP` · 137×16
              - _…and 2 more_
        - **img 2 copy** · `GROUP` · 360×270 · 8 children
          - **Mask** · `RECTANGLE` · 360×270 · ×2
          - **Object** · `GROUP` · 360×270 · 3 children
            - **Bitmap** · `RECTANGLE` · 360×270 · ×3
          - **Share** · `FRAME` · 64×22 · 3 children
            - **Rectangle** · `RECTANGLE` · 64×22
            - **Share** · `TEXT` · 32×14 · “Share”
            - **icon/navigation/more_vert_24px copy 3** · `INSTANCE` · 12×12 · instance of icon/navigation/more_vert_24px copy 3
          - **report image** · `FRAME` · 107×22 · 4 children
            - **Rectangle** · `RECTANGLE` · 107×22
            - **Report Image** · `TEXT` · 75×14 · “Report Image”
            - **arrow-down-angle** · `GROUP` · 6×4
              - _…and 1 more_
            - **warning** · `GROUP` · 12×11
              - _…and 3 more_
          - **img label** · `FRAME` · 83×20
          - **zoom out** · `GROUP` · 32×32 · 2 children
            - **Rectangle Copy** · `RECTANGLE` · 32×32
            - **zoom out** · `GROUP` · 14×14
              - _…and 2 more_
          - **zoom in** · `GROUP` · 32×32 · 2 children
            - **Rectangle Copy** · `RECTANGLE` · 32×32
            - **zoom in** · `GROUP` · 13×13
              - _…and 2 more_
        - **img 1** · `GROUP` · 360×200 · 5 children
          - **Bitmap** · `RECTANGLE` · 360×200
          - **Share** · `FRAME` · 64×22 · 3 children
            - **Rectangle** · `RECTANGLE` · 64×22
            - **Share** · `TEXT` · 32×14 · “Share”
            - **icon/navigation/more_vert_24px copy 3** · `INSTANCE` · 12×12 · instance of icon/navigation/more_vert_24px copy 3
          - **report image** · `FRAME` · 107×22 · 4 children
            - **Rectangle** · `RECTANGLE` · 107×22
            - **Report Image** · `TEXT` · 75×14 · “Report Image”
            - **arrow-down-angle** · `GROUP` · 6×4
              - _…and 1 more_
            - **warning** · `GROUP` · 12×11
              - _…and 3 more_
          - **zoom out** · `GROUP` · 32×32 · 2 children
            - **Rectangle Copy** · `RECTANGLE` · 32×32
            - **zoom out** · `GROUP` · 14×14
              - _…and 2 more_
          - **zoom in** · `GROUP` · 32×32 · 2 children
            - **Rectangle Copy** · `RECTANGLE` · 32×32
            - **zoom in** · `GROUP` · 13×13
              - _…and 2 more_
        - **img 2** · `GROUP` · 360×259 · 9 children
          - **Mask** · `RECTANGLE` · 360×259 · ×2
          - **Bitmap** · `RECTANGLE` · 360×270
          - **Share** · `FRAME` · 64×22 · 3 children
            - **Rectangle** · `RECTANGLE` · 64×22
            - **Share** · `TEXT` · 32×14 · “Share”
            - **icon/navigation/more_vert_24px copy 3** · `INSTANCE` · 12×12 · instance of icon/navigation/more_vert_24px copy 3
          - **report image** · `FRAME` · 107×22 · 4 children
            - **Rectangle** · `RECTANGLE` · 107×22
            - **Report Image** · `TEXT` · 75×14 · “Report Image”
            - **arrow-down-angle** · `GROUP` · 6×4
              - _…and 1 more_
            - **warning** · `GROUP` · 12×11
              - _…and 3 more_
          - **report dd** · `FRAME` · 222×177 · 12 children
            - **Rectangle** · `RECTANGLE` · 222×177
            - **Select what’s wrong?** · `TEXT` · 121×12 · “Select what’s wrong?”
            - **Not a real image Copy** · `TEXT` · 91×14 · “Not a real image”
            - **Bad quality image** · `TEXT` · 99×14 · “Bad quality image”
            - **check** · `GROUP` · 11×9
              - _…and 1 more_
            - **Rotated image** · `TEXT` · 81×14 · “Rotated image”
            - **Adult / offensive /** · `TEXT` · 185×14 · “Adult / offensive / violent content”
            - **Image not visible** · `TEXT` · 94×14 · “Image not visible”
            - **Line** · `VECTOR` · 220×1
            - **Line Copy** · `VECTOR` · 220×1
            - **Line Copy 2** · `VECTOR` · 220×1
            - **Line Copy 3** · `VECTOR` · 220×1
          - **zoom out** · `GROUP` · 32×32 · 2 children
            - **Rectangle Copy** · `RECTANGLE` · 32×32
            - **zoom out** · `GROUP` · 14×14
              - _…and 2 more_
          - **zoom in** · `GROUP` · 32×32 · 2 children
            - **Rectangle Copy** · `RECTANGLE` · 32×32
            - **zoom in** · `GROUP` · 13×13
              - _…and 2 more_
          - **img label** · `FRAME` · 83×20 · 2 children
            - **Rectangle** · `RECTANGLE` · 83×20
            - **Living Room** · `TEXT` · 67×14 · “Living Room”
        - **img 2 copy** · `GROUP` · 360×181 · 2 children
          - **Bitmap** · `RECTANGLE` · 360×181
          - **img label** · `FRAME` · 83×17 · 2 children
            - **Rectangle** · `RECTANGLE` · 83×17
            - **Living Room** · `TEXT` · 67×14 · “Living Room”
      - **Frame 2087324959** · `FRAME` · 360×452 · vertical stack, gap 80px, padding 100/0/48/0px · 2 children
        - **Frame 2087324967** · `FRAME` · 264×200 · vertical stack, gap 24px · 2 children
          - **Frame 2087324969** · `FRAME` · 264×88 · vertical stack, gap 16px · 1 children
            - **Frame 2087324970** · `FRAME` · 264×88 · vertical stack, gap 8px
              - _…and 2 more_
          - **Frame 2087324971** · `FRAME` · 264×88 · vertical stack, gap 8px · 2 children
            - **CTA** · `FRAME` · 186×48 · horizontal row, gap 10px, padding 16/60/16/60px
              - _…and 1 more_
            - **Get instant updates, connect with sellers, and a personalised experience** · `TEXT` · 264×32 · “Get instant updates, connect with sellers, and a personalised experience”
        - **Frame 2087324968** · `FRAME` · 164×24 · horizontal row, gap 12px · 2 children
          - **GetItOnGooglePlay_Badge_Web_color_English 1** · `FRAME` · 80×24 · 5 children
            - **Vector** · `VECTOR` · 80×24
            - **Vector** · `VECTOR` · 80×24
            - **Group** · `GROUP` · 23×4
              - _…and 7 more_
            - **Vector** · `VECTOR` · 50×10
            - **Group** · `GROUP` · 14×15
              - _…and 4 more_
          - **Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917 1** · `FRAME` · 72×24 · 1 children
            - **Group** · `GROUP` · 72×24
              - _…and 2 more_
    - **crf** · `FRAME` · 360×595 · 8 children
      - **Rectangle** · `RECTANGLE` · 360×595
      - **Rectangle** · `RECTANGLE` · 328×280
      - **social msg** · `FRAME` · 328×40 · 3 children
        - **Rectangle** · `RECTANGLE` · 328×40
        - **Fill 1** · `VECTOR` · 13×18
        - **156 people are looki** · `TEXT` · 218×14 · “156 people are looking for this property”
      - **promotr** · `FRAME` · 171×55 · 4 children
        - **Rectangle** · `RECTANGLE` · 48×48
        - **Stephanus Huggins** · `TEXT` · 108×17 · “Stephanus Huggins”
        - **Builder** · `TEXT` · 40×17 · “Builder”
        - **+91-XXXXXX6787** · `TEXT` · 98×17 · “+91-XXXXXX6787”
      - **share contacts** · `FRAME` · 313×252 · 8 children
        - **Please share your co** · `TEXT` · 140×14 · “Please share your contact”
        - **Line** · `VECTOR` · 297×1 · ×3
        - **Name** · `TEXT` · 32×14 · “Name”
        - **Phone** · `TEXT` · 38×12 · “Phone”
        - **Group 2** · `FRAME` · 304×68 · 9 children
          - **You are looking for** · `TEXT` · 102×14 · “You are looking for”
          - **Rectangle** · `RECTANGLE` · 64×41
          - **1 BHK** · `TEXT` · 34×14 · “1 BHK”
          - **Rectangle** · `RECTANGLE` · 64×41
          - **2 BHK** · `TEXT` · 34×14 · “2 BHK”
          - **Rectangle** · `RECTANGLE` · 64×41
          - **3 BHK** · `TEXT` · 34×14 · “3 BHK”
          - **Rectangle** · `RECTANGLE` · 64×41
          - **4 BHK** · `TEXT` · 34×14 · “4 BHK”
        - **Email** · `TEXT` · 30×14 · “Email”
      - **allow other options** · `FRAME` · 211×48 · 4 children
        - **Allow other sellers** · `TEXT` · 180×14 · “Allow other sellers to get in touch”
        - **Shape** · `BOOLEAN_OPERATION` · 16×16 · 2 children
          - **Path** · `VECTOR` · 16×16
          - **Path** · `VECTOR` · 12×9
        - **Rectangle** · `RECTANGLE` · 16×16
        - **r** · `TEXT` · 160×14 · “I am interested in Home loans”
      - **Contacting for 2BHK** · `TEXT` · 200×12 · “Contacting for 2BHK Apartment”
      - **cta** · `FRAME` · 344×48 · 2 children
        - **Rectangle** · `RECTANGLE` · 328×48
        - **Contact Builder** · `TEXT` · 83×14 · “Contact Builder”
  - **Group 2109** · `GROUP` · 360×58 · 2 children
    - **Rectangle** · `VECTOR` · 360×58
    - **Group 2195** · `GROUP` · 332×32 · 5 children
      - **Group 261** · `GROUP` · 68×24 · 3 children
        - **Rectangle** · `RECTANGLE` · 68×24
        - **Featured Developers** · `TEXT` · 36×16 · “Share”
        - **Group 32** · `GROUP` · 12×13 · 5 children
          - **Line 4** · `VECTOR` · 8×5 · ×2
          - **Oval** · `ELLIPSE` · 4×4
          - **Oval Copy** · `ELLIPSE` · 4×4
          - **Oval Copy 2** · `ELLIPSE` · 4×4
      - **Group 262** · `GROUP` · 61×24 · 3 children
        - **Rectangle** · `VECTOR` · 61×24
        - **Path** · `VECTOR` · 12×11
        - **Featured Developers** · `TEXT` · 29×16 · “Save”
      - **back arrow** · `GROUP` · 32×32 · 2 children
        - **Oval** · `ELLIPSE` · 32×32
        - **ic_cancel_24px** · `GROUP` · 24×24 · 2 children
          - **Path** · `VECTOR` · 24×24
          - **arrow_back - material** · `VECTOR` · 14×14
      - **2 BHK Independent A…** · `TEXT` · 131×16 · “Vasudev Kutumbaka...”
      - **₹ 81.97 L** · `TEXT` · 168×16 · “₹ 81.97 L”
  - **Container** · `FRAME` · 344×116 · 2 children
    - **Background+HorizontalBorder+Shadow** · `FRAME` · 344×60 · 2 children
      - **viewedIcon.793b9bec.gif** · `FRAME` · 20×20
      - **30 people are currently viewing this property.** · `TEXT` · 243×12 · “30 people are currently viewing this property.”
    - **Background+Shadow** · `FRAME` · 344×80 · vertical stack, gap 10px, padding 12px · 1 children
      - **Button** · `FRAME` · 320×56 · 1 children
        - **Contact Seller** · `TEXT` · 105×28 · “Contact Seller”

### Chat

Page: Chat · 2 variants

Reuse: import existing — key `46462fd1d231c4856beadb253ea40fef38bf37c6` · node `2232:162`

| Property | Values |
|---|---|
| Property 1 | First time, Initiate |

Sample variant structure:

- **Property 1=First time** · `COMPONENT` · 360×800 · vertical stack, gap 12px · 4 children
  - **Frame 8** · `FRAME` · 360×128 · vertical stack, gap 8px, padding 16/16/8/16px · 2 children
    - **Frame 3** · `FRAME` · 316×24 · horizontal row, gap 141px · 2 children
      - **Frame 2** · `FRAME` · 151×24 · horizontal row, gap 16px · 2 children
        - **Back Navigation** · `GROUP` · 24×24 · 3 children
          - **Mask** · `RECTANGLE` · 24×24
          - **Mask** · `RECTANGLE` · 24×24
          - **Group 4** · `GROUP` · 17×17 · 1 children
            - **Union** · `BOOLEAN_OPERATION` · 17×17
              - _…and 3 more_
        - **Frame 1** · `FRAME` · 111×24 · horizontal row, gap 8px · 2 children
          - **Mask group** · `GROUP` · 24×24 · 2 children
            - **Ellipse 108** · `ELLIPSE` · 24×24
            - **image 3** · `RECTANGLE` · 56×37
          - **Group 1902** · `GROUP` · 79×16 · 1 children
            - **Group 1901** · `GROUP` · 79×16
              - _…and 1 more_
      - **More** · `GROUP` · 24×24 · 2 children
        - **Rectangle 1145** · `RECTANGLE` · 24×24
        - **Group 1901** · `GROUP` · 3×15 · 3 children
          - **Ellipse 20** · `ELLIPSE` · 3×3
          - **Ellipse 21** · `ELLIPSE` · 3×3
          - **Ellipse 22** · `ELLIPSE` · 3×3
    - **Group 1000003108** · `GROUP` · 328×72 · 2 children
      - **Rectangle 47** · `RECTANGLE` · 328×72
      - **Frame 7** · `FRAME` · 297×56 · horizontal row, gap 12px · 2 children
        - **Mask Group** · `GROUP` · 56×56 · 3 children
          - **Rectangle 25** · `RECTANGLE` · 56×56
          - **images 1** · `RECTANGLE` · 91×65
          - **fs-large 2** · `RECTANGLE` · 116×65
        - **Frame 6** · `FRAME` · 229×56 · vertical stack, gap 8px · 2 children
          - **Frame 4** · `FRAME` · 136×32 · vertical stack · 2 children
            - **₹5.5 Cr** · `TEXT` · 136×16 · “₹5.5 Cr”
            - **2 BHK Apartment** · `TEXT` · 136×16 · “2 BHK Apartment”
          - **Frame 5** · `FRAME` · 229×16 · horizontal row, gap 4px · 2 children
            - **Mask group** · `GROUP` · 16×16
              - _…and 2 more_
            - **Location** · `TEXT` · 213×16 · “F Block, Sector 48, Noida Ext., Noida ”
  - **Frame 10** · `FRAME` · 360×548 · vertical stack, gap 16px · 3 children
    - **Today** · `TEXT` · 360×12 · “Today”
    - **Frame 2234** · `FRAME` · 360×76 · vertical stack, gap 10px, padding 0/16/0/16px · 1 children
      - **Frame 20** · `FRAME` · 198×76 · vertical stack, gap 10px, padding 8/8/4/8px · 1 children
        - **Frame 19** · `FRAME` · 182×64 · vertical stack, gap 4px · 2 children
          - **Hello, I am interested in the flat** · `TEXT` · 182×48 · “Initiating a chat request will share your name and contact number with the selle”
          - **3 BHK Apartment** · `TEXT` · 182×12 · “9:32 AM”
    - **Group 1000003114** · `GROUP` · 360×28 · 2 children
      - **The seller is offline & usually responds within 24hrs.** · `TEXT` · 360×12 · “The seller is offline & usually responds within 24hrs.”
      - **You can wait for a response or call them directly.** · `TEXT` · 360×12 · “You can wait for a response or call them directly.”
  - **Frame 15** · `FRAME` · 447×32 · horizontal row, gap 4px, padding 0/0/0/16px · 4 children
    - **Group 1981** · `GROUP` · 32×32 · 1 children
      - **Group 2092** · `GROUP` · 32×32 · 1 children
        - **Frame 11** · `FRAME` · 32×32 · horizontal row, gap 10px, padding 8px · 1 children
          - **Mask group** · `GROUP` · 16×16 · 2 children
            - **Rectangle 1190** · `RECTANGLE` · 16×16
            - **Group 2258** · `GROUP` · 15×15
              - _…and 1 more_
    - **Group 1909** · `GROUP` · 143×32 · 1 children
      - **Group 60** · `GROUP` · 143×32 · 1 children
        - **Frame 12** · `FRAME` · 143×32 · horizontal row, gap 10px, padding 8/16/8/16px · 1 children
          - **Share more images** · `TEXT` · 111×16 · “Share more images”
    - **Group 1910** · `GROUP` · 127×32 · 1 children
      - **Group 60** · `GROUP` · 127×32 · 1 children
        - **Frame 13** · `FRAME` · 127×32 · horizontal row, gap 10px, padding 8/16/8/16px · 1 children
          - **Hi, Please reply..** · `TEXT` · 94×16 · “Hi, Please reply..”
    - **Group 1911** · `GROUP` · 117×32 · 1 children
      - **Group 60** · `GROUP` · 117×32 · 1 children
        - **Frame 14** · `FRAME` · 117×32 · horizontal row, gap 10px, padding 8/16/8/16px · 1 children
          - **Not interested** · `TEXT` · 83×16 · “Not interested”
  - **Frame 17** · `FRAME` · 360×56 · vertical stack, gap 10px, padding 12/16/12/16px · 1 children
    - **Frame 16** · `FRAME` · 328×32 · horizontal row, gap 12px · 2 children
      - **Hello, I am interested in the flat|** · `TEXT` · 240×20 · “Hello, I am interested in the flat|”
      - **Frame 18** · `FRAME` · 76×32 · horizontal row, gap 12px · 2 children
        - **Mask group** · `GROUP` · 32×32 · 2 children
          - **Rectangle 1195** · `RECTANGLE` · 32×32
          - **Vector 366** · `VECTOR` · 24×24
        - **Group 2261** · `GROUP` · 32×32 · 2 children
          - **Ellipse 552** · `ELLIPSE` · 32×32
          - **Mask group** · `GROUP` · 24×24 · 2 children
            - **Rectangle 1194** · `RECTANGLE` · 24×24
            - **Subtract** · `BOOLEAN_OPERATION` · 21×24
              - _…and 2 more_

### Pills

Page: Chat · 2 variants

Reuse: import existing — key `4f8a1c2228328c30728e0ec28077aa7599948e05` · node `2322:1430`

| Property | Values |
|---|---|
| Property 1 | Default, Selected |

Sample variant structure:

- **Property 1=Default** · `COMPONENT` · 140×32 · vertical stack, gap 4px, padding 8px · 1 children
  - **₹20,800/month** · `TEXT` · 92×16 · “₹20,800/month”

### 3 year return

Page: Price Trends · 3 variants

Reuse: import existing — key `975462e16988e6e409b8eca4431e1448cf15980b` · node `3681:2941`

| Property | Values |
|---|---|
| Property 1 | Negative, Positive, Neutral |

Sample variant structure:

- **Property 1=Positive** · `COMPONENT` · 157×40 · vertical stack, gap 2px · 2 children
  - **Frame 2147261500** · `FRAME` · 60×16 · vertical stack, gap 4px · 1 children
    - **3Y returns** · `TEXT` · 60×16 · “3Y returns”
  - **Frame 2147261465** · `FRAME` · 65×22 · horizontal row, gap 4px · 2 children
    - **TrendUp** · `INSTANCE` · 18×18 · instance of TrendUp
    - **Frame 2147261456** · `FRAME` · 43×22 · horizontal row, gap 16px · 1 children
      - **18.3%** · `TEXT` · 43×22 · “18.3%”

### Cards

Page: Price Trends · 4 variants

Reuse: import existing — key `c4d51129763e055a29c23e5a712e2a62394a58ea` · node `3681:3459`

| Property | Values |
|---|---|
| Category | Buy Locality, Rent, Buy Project, Rent - Project |

Sample variant structure:

- **Category=Buy Locality** · `COMPONENT` · 706×341 · vertical stack, gap 16px, padding 24px · 5 children
  - **Sector 38** · `FRAME` · 200×150 · 1 children
    - **Pill / Ready to move** · `FRAME` · 54×30 · horizontal row, gap 4px, padding 4/8/4/8px · 2 children
      - **Star** · `INSTANCE` · 16×16 · instance of Star
      - **Label** · `TEXT` · 18×16 · “4.6”
  - **Frame 2147261489** · `FRAME` · 656×210 · vertical stack, gap 16px · 3 children
    - **Frame 2147261486** · `FRAME` · 656×48 · horizontal row, gap 24px · 2 children
      - **Frame 2147261507** · `FRAME` · 568×48 · horizontal row, gap 16px · 1 children
        - **Frame 2147261506** · `FRAME` · 568×48 · vertical stack, gap 16px · 1 children
          - **Frame 2147261483** · `FRAME` · 336×48 · vertical stack, gap 12px · 1 children
            - **Frame 2147261389** · `FRAME` · 336×48 · vertical stack, gap 4px · 2 children
              - **Frame 2147261484** · `FRAME` · 227×28 · horizontal row, gap 6px
                - _…and 1 more_
              - **Sector 86, New Gurgaon, Gurgaon** · `TEXT` · 336×16 · “Sector 86, New Gurgaon, Gurgaon”
      - **Button** · `INSTANCE` · 64×16 · horizontal row, gap 4px · instance of Button
    - **Line 5** · `LINE` · 656×0
    - **Frame 2147261381** · `FRAME` · 656×130 · horizontal row, gap 32px · 2 children
      - **Frame 2147261486** · `FRAME` · 326×130 · vertical stack, gap 24px · 2 children
        - **Frame 2147261504** · `FRAME` · 326×40 · horizontal row, gap 24px · 2 children
          - **Frame 2147261473** · `FRAME` · 145×40 · vertical stack, gap 2px · 2 children
            - **Frame 2147261500** · `FRAME` · 104×16 · vertical stack, gap 4px · 1 children
              - **Avg. price in 2026** · `TEXT` · 104×16 · “Avg. price in 2026”
            - **₹20,000 per sq.ft.** · `TEXT` · 120×22 · “₹20,000 per sq.ft.”
          - **3 year return** · `INSTANCE` · 157×40 · vertical stack, gap 2px · instance of 3 year return
        - **Frame 2147261487** · `FRAME` · 326×66 · vertical stack, gap 10px · 2 children
          - **Key highlights** · `TEXT` · 82×16 · “Key highlights”
          - **Frame 2147261480** · `FRAME` · 326×40 · vertical stack, gap 8px · 2 children
            - **Frame 2147261515** · `FRAME` · 187×16 · horizontal row, gap 8px · 2 children
              - **Check** · `INSTANCE` · 16×16 · instance of Check
              - **Text** · `TEXT` · 163×16 · “Various IT offices nearby”
            - **Frame 2147261514** · `FRAME` · 224×16 · horizontal row, gap 8px · 2 children
              - **Check** · `INSTANCE` · 16×16 · instance of Check
              - **Text** · `TEXT` · 200×16 · “Access to prominent malls +12”
      - **Frame 2147261451** · `FRAME` · 298×130 · vertical stack, gap 16px, padding 16/12/12/12px · 1 children
        - **Frame 2147261487** · `FRAME` · 274×102 · vertical stack, gap 8px · 2 children
          - **Frame 2147261473** · `FRAME` · 274×80 · vertical stack, gap 10px · 1 children
            - **Frame 2147261510** · `FRAME` · 274×80 · horizontal row, gap 20px · 2 children
              - **Frame 2147261510** · `FRAME` · 21×80 · vertical stack, gap 16px
                - _…and 3 more_
              - **Frame 2147261509** · `FRAME` · 233×80 · vertical stack, gap 59px, padding 8/0/8/0px
                - _…and 6 more_
          - **Frame 2147261463** · `FRAME` · 274×14 · horizontal row, gap 16px, padding 0/0/0/24px · 3 children
            - **Placeholder** · `TEXT` · 76×14 · “2023”
            - **Placeholder** · `TEXT` · 86×14 · “2024”
            - **Placeholder** · `TEXT` · 58×14 · “2025”
  - **Line 5** · `LINE` · 656×0
  - **Frame 2147261390** · `FRAME` · 868×44 · horizontal row, gap 12px, padding 12/0/0/0px · 2 children
    - **Frame 2087324852** · `FRAME` · 545×32 · horizontal row, gap 12px · 5 children
      - **Frame 2087324307** · `FRAME` · 155×32 · vertical stack, gap 8px, padding 8/12/8/12px · 1 children
        - **Frame 2087324843** · `FRAME` · 131×16 · horizontal row, gap 8px · 2 children
          - **Frame 2087324385** · `FRAME` · 107×16 · vertical stack, gap 4px · 1 children
            - **Frame 2087324819** · `FRAME` · 107×16 · horizontal row, gap 8px · 1 children
              - **Text** · `TEXT` · 107×16 · “2 BHK in Sector 38”
          - **ArrowSquareOut** · `INSTANCE` · 16×16 · instance of ArrowSquareOut
      - **Frame 2087324308** · `FRAME` · 155×32 · vertical stack, gap 8px, padding 8/12/8/12px · 1 children
        - **Frame 2087324843** · `FRAME` · 131×16 · horizontal row, gap 8px · 2 children
          - **Frame 2087324385** · `FRAME` · 107×16 · vertical stack, gap 4px · 1 children
            - **Frame 2087324819** · `FRAME` · 107×16 · horizontal row, gap 8px · 1 children
              - **Text** · `TEXT` · 107×16 · “2 BHK in Sector 38”
          - **ArrowSquareOut** · `INSTANCE` · 16×16 · instance of ArrowSquareOut
      - **Frame 2087324309** · `FRAME` · 155×32 · vertical stack, gap 8px, padding 8/12/8/12px · 1 children
        - **Frame 2087324843** · `FRAME` · 131×16 · horizontal row, gap 8px · 2 children
          - **Frame 2087324385** · `FRAME` · 107×16 · vertical stack, gap 4px · 1 children
            - **Frame 2087324819** · `FRAME` · 107×16 · horizontal row, gap 8px · 1 children
              - **Text** · `TEXT` · 107×16 · “2 BHK in Sector 38”
          - **ArrowSquareOut** · `INSTANCE` · 16×16 · instance of ArrowSquareOut
      - **Frame 2087324310** · `FRAME` · 155×32 · vertical stack, gap 8px, padding 8/12/8/12px · 1 children
        - **Frame 2087324843** · `FRAME` · 131×16 · horizontal row, gap 8px · 2 children
          - **Frame 2087324385** · `FRAME` · 107×16 · vertical stack, gap 4px · 1 children
            - **Frame 2087324819** · `FRAME` · 107×16 · horizontal row, gap 8px · 1 children
              - **Text** · `TEXT` · 107×16 · “2 BHK in Sector 38”
          - **ArrowSquareOut** · `INSTANCE` · 16×16 · instance of ArrowSquareOut
      - **Frame 2087324311** · `FRAME` · 155×32 · vertical stack, gap 8px, padding 8/12/8/12px · 1 children
        - **Frame 2087324843** · `FRAME` · 131×16 · horizontal row, gap 8px · 2 children
          - **Frame 2087324385** · `FRAME` · 107×16 · vertical stack, gap 4px · 1 children
            - **Frame 2087324819** · `FRAME` · 107×16 · horizontal row, gap 8px · 1 children
              - **Text** · `TEXT` · 107×16 · “2 BHK in Sector 38”
          - **ArrowSquareOut** · `INSTANCE` · 16×16 · instance of ArrowSquareOut
    - **Vector 4** · `VECTOR` · 0×29
  - **Frame 2147261474** · `FRAME` · 656×48 · horizontal row, gap 16px · 2 children
    - **Button** · `INSTANCE` · 126×48 · horizontal row, gap 8px, padding 12/20/12/20px · instance of Button
    - **Button** · `INSTANCE` · 176×48 · horizontal row, gap 8px, padding 12/20/12/20px · instance of Button

## 8. States

State tokens should be derived from the base palette above. Recommended mappings:

| State | Treatment |
|-------|-----------|
| Hover | Lighten/darken accent by 10% |
| Focus | 2px ring using accent color with 30% opacity |
| Disabled | 40% opacity, no pointer events |
| Error | Use danger color for border and text |

## 9. Rules

### Do

- Use the 2px base unit for all spacing decisions
- Use `#5e23dc` (accent) as the primary accent color
- Bind colors to the tokens below instead of hardcoding hex values

### Don't

- Introduce new colors without adding them to the palette
- Mix corner radii outside the radius scale

## 10. Extending this system

### How to reuse this DESIGN.md

Import into Figma with `figma-cli import <this file>` — colors, radii and typography become variables.

### When to add a new token vs reuse

Reuse the closest existing token; add a new one only when a new semantic role appears.

## 11. Machine-readable tokens

The block below is the canonical token map. It mirrors the tables above but is unambiguous and parseable.

```json design-tokens
{
  "$schema": "design-tokens.v1",
  "meta": {
    "source": "Demand Component Kit",
    "generated": "2026-07-01"
  },
  "color": {
    "background": "#ffffff",
    "text-primary": "#222222",
    "surface": "#e1e2e8",
    "accent": "#5e23dc",
    "text-secondary": "#434343",
    "text-tertiary": "#767676",
    "text-primary-alt": "#000000",
    "surface-alt": "#d9d9d9",
    "accent-alt": "#edebdf",
    "text-primary-3": "#0f0e0d",
    "text-secondary-alt": "#656565",
    "border": "#d8d8d8",
    "surface-3": "#f2f3f8",
    "border-alt": "#ddd9ce",
    "accent-3": "#8a38f5",
    "text-secondary-3": "#666666",
    "text-secondary-4": "#444444",
    "background-alt": "#faf9f5",
    "surface-4": "#f5f5f5",
    "surface-5": "#e9eaff",
    "accent-4": "#401045",
    "text-tertiary-alt": "#747474",
    "text-primary-4": "#1b1b1c",
    "accent-5": "#f6f4ed",
    "accent-6": "#9792ff",
    "background-3": "#fafafa",
    "accent-7": "#1f0247",
    "accent-8": "#d2d3ff",
    "accent-9": "#4a16d9",
    "surface-6": "#f6f1f8",
    "text-primary-5": "#333333",
    "background-4": "#f8f9ff",
    "text-tertiary-3": "#7f7f7f",
    "surface-7": "#e0e0e0",
    "text-primary-6": "#191919",
    "accent-10": "#7a48f6",
    "text-primary-7": "#1e1b24",
    "background-5": "#f4f2ff",
    "text-secondary-5": "#6c6c6c",
    "surface-8": "#f1f2f7",
    "accent-11": "#40268b",
    "text-secondary-6": "#555555",
    "accent-12": "#e80067",
    "accent-13": "#d1d2ff",
    "accent-14": "#d2624a",
    "accent-15": "#fe88c1",
    "text-tertiary-4": "#757575",
    "border-3": "#c4c4c4",
    "accent-16": "#eee4f1",
    "accent-17": "#ed1b8a",
    "border-4": "#999999",
    "border-5": "#cccccc",
    "text-primary-8": "#3c3630",
    "surface-9": "#f1ebff",
    "accent-18": "#6a44d3",
    "accent-19": "#f85181",
    "surface-10": "#dbdbdb",
    "accent-20": "#008f4b",
    "surface-11": "#e8e8e8",
    "accent-21": "#0f8458",
    "accent-22": "#eae4ff",
    "text-primary-9": "#1c1c1c",
    "accent-23": "#f7a58d",
    "accent-24": "#31166f",
    "accent-25": "#62d883",
    "accent-26": "#245f36",
    "accent-27": "#5f25dc",
    "background-6": "#f8f5ff",
    "accent-28": "#6b3d97",
    "accent-29": "#5e40e0",
    "accent-30": "#292949",
    "accent-31": "#9791ff",
    "accent-32": "#f0ece3",
    "surface-12": "#ebebeb",
    "accent-33": "#27aa4b",
    "text-primary-10": "#323232",
    "accent-34": "#fff6e5",
    "accent-35": "#b9a1eb",
    "accent-36": "#6a1bc2",
    "surface-13": "#edfff8",
    "surface-14": "#f7f7f7",
    "border-6": "#9f9f9f",
    "accent-37": "#36c991",
    "accent-38": "#e81c28",
    "surface-15": "#e8e9ff",
    "text-secondary-7": "#61605d",
    "accent-39": "#f955a3",
    "accent-40": "#fbd1e8",
    "accent-41": "#ff9acb",
    "surface-16": "#e5e5e5",
    "surface-17": "#eaf3ff",
    "text-tertiary-5": "#a09890",
    "accent-42": "#fadf4f",
    "text-secondary-8": "#4e4e4e",
    "accent-43": "#e5b45f",
    "surface-18": "#e6e6e6",
    "surface-19": "#fff0ee",
    "accent-44": "#dbb680",
    "accent-45": "#e980c0",
    "border-7": "#bababa",
    "accent-46": "#73a9b5",
    "accent-47": "#703aff",
    "accent-48": "#f4866e",
    "accent-49": "#5f00ff",
    "accent-50": "#1f7570",
    "accent-51": "#8c5bbb",
    "accent-52": "#5530d3",
    "accent-53": "#b8b1f9",
    "text-tertiary-6": "#979797",
    "border-8": "#a4a4a4",
    "accent-54": "#652a2a",
    "accent-55": "#e89340",
    "accent-56": "#7422dc",
    "border-9": "#9d9e9f",
    "surface-20": "#edf8ee",
    "surface-21": "#e8e6ff",
    "accent-57": "#ffdc00",
    "accent-58": "#ffab00",
    "surface-22": "#dadada",
    "text-tertiary-7": "#908f8f",
    "text-tertiary-8": "#7d756c",
    "accent-59": "#cdad45",
    "accent-60": "#dab580",
    "accent-61": "#efc2d8",
    "accent-62": "#e980c1",
    "accent-63": "#e445ab",
    "accent-64": "#e339a1",
    "accent-65": "#91246e",
    "accent-66": "#9747ff",
    "accent-67": "#9b6fec",
    "accent-68": "#0e3f3c",
    "surface-23": "#ededed",
    "accent-69": "#dd3387",
    "accent-70": "#fedc3a",
    "accent-71": "#7323dd",
    "accent-72": "#ea4335",
    "accent-73": "#4285f4",
    "accent-74": "#34a853",
    "accent-75": "#edccff",
    "surface-24": "#fffceb",
    "accent-76": "#ffe01f",
    "accent-77": "#e5def9",
    "text-secondary-9": "#646464",
    "accent-78": "#1dd38f",
    "text-secondary-10": "#464646",
    "text-primary-11": "#1e1e1e",
    "surface-25": "#ebeaea",
    "accent-79": "#ceeedc",
    "surface-26": "#ebe7de",
    "accent-80": "#ea4236",
    "accent-81": "#ffdf83",
    "background-7": "#f3f7ff",
    "text-tertiary-9": "#7d7d7d",
    "accent-82": "#5945ed",
    "accent-83": "#f20062",
    "text-secondary-11": "#835353",
    "accent-84": "#5875e9",
    "accent-85": "#e0b02d",
    "surface-27": "#f4f4f4",
    "accent-86": "#f22b68",
    "surface-28": "#e9e9e9",
    "accent-87": "#ffd88a",
    "accent-88": "#bb281b",
    "background-8": "#fefefe",
    "accent-89": "#7c4718",
    "text-secondary-12": "#5b7479",
    "accent-90": "#2f7f49",
    "accent-91": "#be3f31",
    "accent-92": "#ff1a87",
    "accent-93": "#8c7aed",
    "accent-94": "#1b1f80",
    "accent-95": "#cdad46",
    "accent-96": "#cdad47",
    "accent-97": "#cead48",
    "accent-98": "#ceae49",
    "accent-99": "#ceae4a",
    "accent-100": "#ceae4b",
    "accent-101": "#cfae4c",
    "accent-102": "#cfae4d",
    "accent-103": "#cfae4e",
    "accent-104": "#cfae4f",
    "accent-105": "#cfaf50",
    "accent-106": "#d0af51",
    "accent-107": "#d0af52",
    "accent-108": "#d0af53",
    "accent-109": "#d0af54",
    "accent-110": "#d1af55",
    "accent-111": "#d1af56",
    "accent-112": "#d1af57",
    "accent-113": "#d1b058",
    "accent-114": "#d1b059",
    "accent-115": "#d2b05a",
    "accent-116": "#d2b05b",
    "accent-117": "#d2b05c",
    "accent-118": "#d2b05d",
    "accent-119": "#d3b05e",
    "accent-120": "#d3b15f",
    "accent-121": "#d3b160",
    "accent-122": "#d3b161",
    "accent-123": "#d3b162",
    "accent-124": "#d4b163",
    "accent-125": "#d4b164",
    "accent-126": "#d4b165",
    "accent-127": "#d4b266",
    "accent-128": "#d5b267",
    "accent-129": "#d5b268",
    "accent-130": "#d5b269",
    "accent-131": "#d5b26a",
    "accent-132": "#d6b26b",
    "accent-133": "#d6b26c",
    "accent-134": "#d6b36d",
    "accent-135": "#d6b36e",
    "accent-136": "#d6b36f",
    "accent-137": "#d7b370",
    "accent-138": "#d7b371",
    "accent-139": "#d7b372",
    "accent-140": "#d7b373",
    "accent-141": "#d8b374",
    "accent-142": "#d8b475",
    "accent-143": "#d8b476",
    "accent-144": "#d8b477",
    "accent-145": "#d8b478",
    "accent-146": "#d9b479",
    "accent-147": "#d9b47a",
    "accent-148": "#d9b47b",
    "accent-149": "#d9b57c",
    "accent-150": "#dab57d",
    "accent-151": "#dab57e",
    "accent-152": "#dab57f",
    "accent-153": "#dbb580",
    "accent-154": "#dcb680",
    "accent-155": "#dcb681",
    "accent-156": "#dcb682",
    "accent-157": "#dcb683",
    "accent-158": "#dcb784",
    "accent-159": "#ddb785",
    "accent-160": "#ddb786",
    "accent-161": "#ddb787",
    "accent-162": "#ddb788",
    "accent-163": "#deb789",
    "accent-164": "#deb78a",
    "accent-165": "#deb88c",
    "accent-166": "#deb88d",
    "accent-167": "#deb88e",
    "accent-168": "#dfb88f",
    "accent-169": "#dfb890",
    "accent-170": "#dfb891",
    "accent-171": "#dfb892",
    "accent-172": "#e0b893",
    "accent-173": "#e0b994",
    "accent-174": "#e0b995",
    "accent-175": "#e0b996",
    "accent-176": "#e0b997",
    "accent-177": "#e1b998",
    "accent-178": "#e1b999",
    "accent-179": "#e1b99a",
    "accent-180": "#e1ba9b",
    "accent-181": "#e2ba9c",
    "accent-182": "#e2ba9d",
    "accent-183": "#e2ba9e",
    "accent-184": "#e2ba9f",
    "accent-185": "#e2baa0",
    "accent-186": "#e3baa1",
    "accent-187": "#e3bba2",
    "accent-188": "#e3bba3",
    "accent-189": "#e3bba4",
    "accent-190": "#e4bba5",
    "accent-191": "#e4bba6",
    "accent-192": "#e4bba7",
    "accent-193": "#e4bba8",
    "accent-194": "#e4bca9",
    "accent-195": "#e5bcaa",
    "accent-196": "#e5bcab",
    "accent-197": "#e5bcac",
    "accent-198": "#e5bcad",
    "accent-199": "#e6bcae",
    "accent-200": "#e6bcaf",
    "accent-201": "#e6bcb0",
    "accent-202": "#e6bdb1",
    "accent-203": "#e7bdb2",
    "accent-204": "#e7bdb3",
    "accent-205": "#e7bdb4",
    "accent-206": "#e7bdb5",
    "accent-207": "#e7bdb6",
    "accent-208": "#e8bdb7",
    "accent-209": "#e8beb8",
    "accent-210": "#e8beb9",
    "accent-211": "#e8beba",
    "accent-212": "#e9bebb",
    "accent-213": "#e9bebc",
    "accent-214": "#e9bebd",
    "accent-215": "#e9bebe",
    "accent-216": "#e9bfbf",
    "accent-217": "#eabfc0",
    "accent-218": "#eabfc1",
    "accent-219": "#eabfc2",
    "accent-220": "#eabfc3",
    "accent-221": "#ebbfc4",
    "accent-222": "#ebbfc5",
    "accent-223": "#ebc0c6",
    "accent-224": "#ebc0c7",
    "accent-225": "#ebc0c8",
    "accent-226": "#ecc0c9",
    "accent-227": "#ecc0ca",
    "accent-228": "#ecc0cb",
    "accent-229": "#ecc0cc",
    "accent-230": "#edc0cd",
    "accent-231": "#edc1ce",
    "accent-232": "#edc1cf",
    "accent-233": "#edc1d0",
    "accent-234": "#edc1d1",
    "accent-235": "#eec1d2",
    "accent-236": "#eec1d3",
    "accent-237": "#eec1d4",
    "accent-238": "#eec2d5",
    "accent-239": "#efc2d6",
    "accent-240": "#efc2d7",
    "accent-241": "#efc1d8",
    "accent-242": "#efc0d7",
    "accent-243": "#efbfd7",
    "accent-244": "#efbed7",
    "accent-245": "#efbdd6",
    "accent-246": "#eebcd6",
    "accent-247": "#eebbd6",
    "accent-248": "#eebad5",
    "accent-249": "#eeb9d5",
    "accent-250": "#eeb8d5",
    "accent-251": "#eeb7d4",
    "accent-252": "#eeb6d4",
    "accent-253": "#eeb5d4",
    "accent-254": "#eeb4d3",
    "accent-255": "#eeb3d3",
    "accent-256": "#eeb2d2",
    "accent-257": "#eeb1d2",
    "accent-258": "#edb0d2",
    "accent-259": "#edafd1",
    "accent-260": "#edaed1",
    "accent-261": "#edadd1",
    "accent-262": "#edacd0",
    "accent-263": "#edabd0",
    "accent-264": "#edaad0",
    "accent-265": "#eda9cf",
    "accent-266": "#eda8cf",
    "accent-267": "#eda7cf",
    "accent-268": "#eda6ce",
    "accent-269": "#eda5ce",
    "accent-270": "#eca4ce",
    "accent-271": "#eca3cd",
    "accent-272": "#eca2cd",
    "accent-273": "#eca1cd",
    "accent-274": "#eca0cc",
    "accent-275": "#ec9fcc",
    "accent-276": "#ec9ecc",
    "accent-277": "#ec9dcb",
    "accent-278": "#ec9ccb",
    "accent-279": "#ec9bcb",
    "accent-280": "#ec9aca",
    "accent-281": "#ec99ca",
    "accent-282": "#eb98c9",
    "accent-283": "#eb97c9",
    "accent-284": "#eb96c9",
    "accent-285": "#eb95c8",
    "accent-286": "#eb94c8",
    "accent-287": "#eb93c8",
    "accent-288": "#eb92c7",
    "accent-289": "#eb91c7",
    "accent-290": "#eb90c7",
    "accent-291": "#eb8fc6",
    "accent-292": "#eb8ec6",
    "accent-293": "#eb8dc6",
    "accent-294": "#ea8cc5",
    "accent-295": "#ea8bc5",
    "accent-296": "#ea8ac5",
    "accent-297": "#ea89c4",
    "accent-298": "#ea88c4",
    "accent-299": "#ea87c4",
    "accent-300": "#ea86c3",
    "accent-301": "#ea85c3",
    "accent-302": "#ea84c3",
    "accent-303": "#ea83c2",
    "accent-304": "#ea82c2",
    "accent-305": "#ea81c2",
    "accent-306": "#e980bf",
    "accent-307": "#e97fbf",
    "accent-308": "#e97ebf",
    "accent-309": "#e97dbe",
    "accent-310": "#e97cbe",
    "accent-311": "#e97bbe",
    "accent-312": "#e87abd",
    "accent-313": "#e879bd",
    "accent-314": "#e878bd",
    "accent-315": "#e877bc",
    "accent-316": "#e876bc",
    "accent-317": "#e875bc",
    "accent-318": "#e874bb",
    "accent-319": "#e873bb",
    "accent-320": "#e872bb",
    "accent-321": "#e871ba",
    "accent-322": "#e870ba",
    "accent-323": "#e86fba",
    "accent-324": "#e76eb9",
    "accent-325": "#e76db9",
    "accent-326": "#e76cb9",
    "accent-327": "#e76bb8",
    "accent-328": "#e76ab8",
    "accent-329": "#e769b7",
    "accent-330": "#e768b7",
    "accent-331": "#e767b7",
    "accent-332": "#e766b6",
    "accent-333": "#e765b6",
    "accent-334": "#e764b6",
    "accent-335": "#e763b5",
    "accent-336": "#e662b5",
    "accent-337": "#e661b5",
    "accent-338": "#e660b4",
    "accent-339": "#e65fb4",
    "accent-340": "#e65eb4",
    "accent-341": "#e65db3",
    "accent-342": "#e65cb3",
    "accent-343": "#e65bb3",
    "accent-344": "#e65ab2",
    "accent-345": "#e659b2",
    "accent-346": "#e658b2",
    "accent-347": "#e657b1",
    "accent-348": "#e556b1",
    "accent-349": "#e555b1",
    "accent-350": "#e554b0",
    "accent-351": "#e553b0",
    "accent-352": "#e552b0",
    "accent-353": "#e551af",
    "accent-354": "#e550af",
    "accent-355": "#e54fae",
    "accent-356": "#e54eae",
    "accent-357": "#e54dae",
    "accent-358": "#e54cad",
    "accent-359": "#e54bad",
    "accent-360": "#e44aad",
    "accent-361": "#e449ac",
    "accent-362": "#e448ac",
    "accent-363": "#e447ac",
    "accent-364": "#e446ab",
    "accent-365": "#e444aa",
    "accent-366": "#e443a9",
    "accent-367": "#e442a8",
    "accent-368": "#e441a7",
    "accent-369": "#e440a6",
    "accent-370": "#e33ea6",
    "accent-371": "#e33da5",
    "accent-372": "#e33ca4",
    "accent-373": "#e33ba3",
    "accent-374": "#e33aa2",
    "accent-375": "#e239a0",
    "accent-376": "#e138a0",
    "accent-377": "#e0389f",
    "accent-378": "#df389e",
    "accent-379": "#de389d",
    "accent-380": "#dd379d",
    "accent-381": "#dc379c",
    "accent-382": "#db379b",
    "accent-383": "#da379b",
    "accent-384": "#d9369a",
    "accent-385": "#d83699",
    "accent-386": "#d73699",
    "accent-387": "#d63698",
    "accent-388": "#d53597",
    "accent-389": "#d43596",
    "accent-390": "#d33596",
    "accent-391": "#d23595",
    "accent-392": "#d13494",
    "accent-393": "#d03494",
    "accent-394": "#cf3493",
    "accent-395": "#ce3492",
    "accent-396": "#cd3392",
    "accent-397": "#cc3391",
    "accent-398": "#cb3390",
    "accent-399": "#ca338f",
    "accent-400": "#c9328f",
    "accent-401": "#c8328e",
    "accent-402": "#c7328d",
    "accent-403": "#c6318d",
    "accent-404": "#c5318c",
    "accent-405": "#c4318b",
    "accent-406": "#c3318a",
    "accent-407": "#c2308a",
    "accent-408": "#c13089",
    "accent-409": "#c03088",
    "accent-410": "#bf3088",
    "accent-411": "#be2f87",
    "accent-412": "#bd2f86",
    "accent-413": "#bc2f86",
    "accent-414": "#bb2f85",
    "accent-415": "#b92e84",
    "accent-416": "#b82e83",
    "accent-417": "#b72e83",
    "accent-418": "#b62e82",
    "accent-419": "#b52d81",
    "accent-420": "#b42d81",
    "accent-421": "#b32d80",
    "accent-422": "#b22d80",
    "accent-423": "#b12c80",
    "accent-424": "#b02c80",
    "accent-425": "#af2c80",
    "accent-426": "#ae2c80",
    "accent-427": "#ad2b80",
    "accent-428": "#ac2b80",
    "accent-429": "#ab2b80",
    "accent-430": "#aa2a80",
    "accent-431": "#a92a7f",
    "accent-432": "#a82a7e",
    "accent-433": "#a72a7d",
    "accent-434": "#a6297d",
    "accent-435": "#a5297c",
    "accent-436": "#a4297b",
    "accent-437": "#a3297b",
    "accent-438": "#a2287a",
    "accent-439": "#a12879",
    "accent-440": "#a02879",
    "accent-441": "#9f2878",
    "accent-442": "#9e2777",
    "accent-443": "#9d2776",
    "accent-444": "#9c2776",
    "accent-445": "#9b2775",
    "accent-446": "#9a2674",
    "accent-447": "#992674",
    "accent-448": "#982673",
    "accent-449": "#972672",
    "accent-450": "#962572",
    "accent-451": "#952571",
    "accent-452": "#942570",
    "accent-453": "#93256f",
    "accent-454": "#92246f",
    "text-primary-12": "#181818",
    "accent-455": "#5423d0",
    "accent-456": "#5e41c8",
    "surface-29": "#f2ebfe",
    "background-9": "#f9f9f9",
    "accent-457": "#8e90fa",
    "accent-458": "#f17b61",
    "accent-459": "#206c68",
    "accent-460": "#c2c2ff",
    "accent-461": "#4f1aa1",
    "accent-462": "#b8bbf4",
    "accent-463": "#648ee2",
    "accent-464": "#ffcc00",
    "accent-465": "#ed5196",
    "accent-466": "#f746a7",
    "accent-467": "#61aab6",
    "accent-468": "#f6cd46",
    "accent-469": "#e5e5ff",
    "accent-470": "#e2e1f2",
    "accent-471": "#ff007a",
    "accent-472": "#e7e3bf",
    "border-10": "#c3c3c3",
    "text-secondary-13": "#524b40",
    "text-primary-13": "#000100",
    "text-primary-14": "#030303",
    "text-primary-15": "#0e0b0f",
    "accent-473": "#161424",
    "accent-474": "#0f0f2a",
    "text-secondary-14": "#393752",
    "accent-475": "#fdf5d0",
    "accent-476": "#d6bce4",
    "accent-477": "#fbbc04",
    "accent-478": "#fbbc05",
    "accent-479": "#25d366",
    "accent-480": "#edc76e",
    "accent-481": "#e7ddfb",
    "accent-482": "#eaac40",
    "surface-30": "#fefced",
    "accent-483": "#fdf0b1",
    "border-11": "#9c9c9c",
    "border-12": "#a6a6a6",
    "accent-484": "#efb40e",
    "accent-485": "#292400",
    "accent-486": "#f286b5",
    "surface-31": "#e9e5de",
    "text-secondary-15": "#5f5f59",
    "surface-32": "#ecedf0"
  },
  "typography": {
    "display": {
      "fontFamily": "Mail Sans Roman",
      "fontSize": 88,
      "fontWeight": 700
    },
    "display-2": {
      "fontFamily": "Mail Sans Roman",
      "fontSize": 38.251319885253906,
      "fontWeight": 500
    },
    "display-3": {
      "fontFamily": "Google Sans Flex",
      "fontSize": 36,
      "fontWeight": 700
    },
    "display-4": {
      "fontFamily": "Rubik",
      "fontSize": 36,
      "fontWeight": 400
    },
    "h1": {
      "fontFamily": "Google Sans Flex",
      "fontSize": 32,
      "fontWeight": 600,
      "lineHeight": 40
    },
    "h1-2": {
      "fontFamily": "Rubik",
      "fontSize": 32,
      "fontWeight": 500,
      "lineHeight": 36
    },
    "h2": {
      "fontFamily": "Google Sans Flex",
      "fontSize": 28,
      "fontWeight": 600,
      "lineHeight": 36
    },
    "h2-2": {
      "fontFamily": "Rubik",
      "fontSize": 28,
      "fontWeight": 500,
      "lineHeight": 32
    },
    "h2-3": {
      "fontFamily": "Google Sans Flex",
      "fontSize": 28,
      "fontWeight": 700,
      "lineHeight": 36
    },
    "h3": {
      "fontFamily": "Google Sans Flex",
      "fontSize": 24,
      "fontWeight": 500
    },
    "h4": {
      "fontFamily": "Rubik",
      "fontSize": 22,
      "fontWeight": 500,
      "lineHeight": 28
    },
    "h5": {
      "fontFamily": "Rubik",
      "fontSize": 20.5,
      "fontWeight": 400
    },
    "h6": {
      "fontFamily": "Inter",
      "fontSize": 18,
      "fontWeight": 500,
      "letterSpacing": 0.4099999964237213
    },
    "h6-2": {
      "fontFamily": "Rubik",
      "fontSize": 18,
      "fontWeight": 500,
      "lineHeight": 20
    },
    "h6-3": {
      "fontFamily": "Google Sans Flex",
      "fontSize": 18,
      "fontWeight": 600,
      "lineHeight": 26
    },
    "h6-4": {
      "fontFamily": "Rubik",
      "fontSize": 18,
      "fontWeight": 500
    },
    "h6-5": {
      "fontFamily": "Google Sans Flex",
      "fontSize": 18,
      "fontWeight": 500,
      "lineHeight": 24
    },
    "body-lg": {
      "fontFamily": "Rubik",
      "fontSize": 17,
      "fontWeight": 500
    },
    "body-lg-2": {
      "fontFamily": "Rubik",
      "fontSize": 16.5,
      "fontWeight": 500,
      "lineHeight": 26
    },
    "body-lg-3": {
      "fontFamily": "Rubik",
      "fontSize": 16,
      "fontWeight": 500,
      "lineHeight": 20
    },
    "body-lg-4": {
      "fontFamily": "Google Sans Flex",
      "fontSize": 16,
      "fontWeight": 500,
      "lineHeight": 22
    },
    "body-lg-5": {
      "fontFamily": "Google Sans Flex",
      "fontSize": 16,
      "fontWeight": 400,
      "lineHeight": 22
    },
    "body-lg-6": {
      "fontFamily": "Rubik",
      "fontSize": 16,
      "fontWeight": 400,
      "lineHeight": 20
    },
    "body-lg-7": {
      "fontFamily": "Google Sans Flex",
      "fontSize": 16,
      "fontWeight": 500,
      "lineHeight": 24
    },
    "body-lg-8": {
      "fontFamily": "Google Sans Flex",
      "fontSize": 16,
      "fontWeight": 600,
      "lineHeight": 22
    },
    "body-lg-9": {
      "fontFamily": "Rubik",
      "fontSize": 16,
      "fontWeight": 600,
      "lineHeight": 18,
      "letterSpacing": -0.150390625
    },
    "body-lg-10": {
      "fontFamily": "Rubik",
      "fontSize": 16,
      "fontWeight": 500,
      "letterSpacing": 0.5333333611488342
    },
    "body-lg-11": {
      "fontFamily": "Google Sans Flex",
      "fontSize": 16,
      "fontWeight": 400,
      "lineHeight": 24
    },
    "body": {
      "fontFamily": "Rubik",
      "fontSize": 15.25,
      "fontWeight": 500,
      "lineHeight": 28
    },
    "body-2": {
      "fontFamily": "Rubik",
      "fontSize": 14.229114532470703,
      "fontWeight": 400,
      "lineHeight": 18.972152709960938,
      "letterSpacing": 0.23715190589427948
    },
    "body-3": {
      "fontFamily": "Rubik",
      "fontSize": 14,
      "fontWeight": 500,
      "lineHeight": 16
    },
    "body-4": {
      "fontFamily": "Rubik",
      "fontSize": 14,
      "fontWeight": 400,
      "lineHeight": 16
    },
    "body-5": {
      "fontFamily": "Google Sans Flex",
      "fontSize": 14,
      "fontWeight": 400,
      "lineHeight": 16
    },
    "body-6": {
      "fontFamily": "Google Sans Flex",
      "fontSize": 14,
      "fontWeight": 500,
      "lineHeight": 20
    },
    "body-7": {
      "fontFamily": "Google Sans Flex",
      "fontSize": 14,
      "fontWeight": 500,
      "lineHeight": 16
    },
    "body-8": {
      "fontFamily": "Google Sans Flex",
      "fontSize": 14,
      "fontWeight": 400,
      "lineHeight": 20
    },
    "body-9": {
      "fontFamily": "Rubik",
      "fontSize": 14,
      "fontWeight": 500
    },
    "body-10": {
      "fontFamily": "Rubik",
      "fontSize": 14,
      "fontWeight": 400
    },
    "body-11": {
      "fontFamily": "Product Sans",
      "fontSize": 14,
      "fontWeight": 400
    },
    "body-12": {
      "fontFamily": "Rubik",
      "fontSize": 14,
      "fontWeight": 400,
      "lineHeight": 17
    },
    "body-13": {
      "fontFamily": "Rubik",
      "fontSize": 14,
      "fontWeight": 500,
      "lineHeight": 20
    },
    "body-14": {
      "fontFamily": "Rubik",
      "fontSize": 14,
      "fontWeight": 400,
      "lineHeight": 20
    },
    "body-15": {
      "fontFamily": "Google Sans Flex",
      "fontSize": 14,
      "fontWeight": 500,
      "lineHeight": 20,
      "letterSpacing": 0.10000000149011612
    },
    "body-16": {
      "fontFamily": "Roboto",
      "fontSize": 14,
      "fontWeight": 500,
      "lineHeight": 22
    },
    "body-17": {
      "fontFamily": "Google Sans Flex",
      "fontSize": 14,
      "fontWeight": 600,
      "lineHeight": 16
    },
    "body-18": {
      "fontFamily": "Google Sans Flex",
      "fontSize": 14,
      "fontWeight": 400,
      "lineHeight": 16,
      "letterSpacing": 0.20000000298023224
    },
    "body-19": {
      "fontFamily": "Google Sans Flex",
      "fontSize": 14,
      "fontWeight": 500,
      "lineHeight": 12.139406204223633
    },
    "body-20": {
      "fontFamily": "Rubik",
      "fontSize": 14,
      "fontWeight": 400,
      "lineHeight": 17,
      "letterSpacing": 0.23333333432674408
    },
    "body-21": {
      "fontFamily": "Rubik",
      "fontSize": 14,
      "fontWeight": 400,
      "lineHeight": 19
    },
    "body-22": {
      "fontFamily": "Rubik",
      "fontSize": 14,
      "fontWeight": 500,
      "lineHeight": 18
    },
    "body-23": {
      "fontFamily": "Roboto",
      "fontSize": 14,
      "fontWeight": 400,
      "lineHeight": 16
    },
    "body-sm": {
      "fontFamily": "Google Sans Flex",
      "fontSize": 12.5,
      "fontWeight": 300,
      "lineHeight": 18
    },
    "body-sm-2": {
      "fontFamily": "Rubik",
      "fontSize": 12.5,
      "fontWeight": 300,
      "lineHeight": 44
    },
    "body-sm-3": {
      "fontFamily": "Rubik",
      "fontSize": 12.5,
      "fontWeight": 300,
      "lineHeight": 18
    },
    "body-sm-4": {
      "fontFamily": "Rubik",
      "fontSize": 12.5,
      "fontWeight": 400,
      "lineHeight": 14
    },
    "body-sm-5": {
      "fontFamily": "Rubik",
      "fontSize": 12.5,
      "fontWeight": 400,
      "lineHeight": 12
    },
    "body-sm-6": {
      "fontFamily": "Rubik",
      "fontSize": 12.5,
      "fontWeight": 400,
      "lineHeight": 40
    },
    "caption": {
      "fontFamily": "Rubik",
      "fontSize": 12,
      "fontWeight": 400,
      "lineHeight": 16,
      "letterSpacing": 0.20000000298023224
    },
    "caption-2": {
      "fontFamily": "Rubik",
      "fontSize": 12,
      "fontWeight": 500,
      "lineHeight": 16,
      "letterSpacing": 0.20000000298023224
    },
    "caption-3": {
      "fontFamily": "Rubik",
      "fontSize": 12,
      "fontWeight": 400
    },
    "caption-4": {
      "fontFamily": "Google Sans Flex",
      "fontSize": 12,
      "fontWeight": 400,
      "lineHeight": 16
    },
    "caption-5": {
      "fontFamily": "Google Sans Flex",
      "fontSize": 12,
      "fontWeight": 400,
      "lineHeight": 16,
      "letterSpacing": 0.10000000149011612
    },
    "caption-6": {
      "fontFamily": "Rubik",
      "fontSize": 12,
      "fontWeight": 400,
      "lineHeight": 16
    },
    "caption-7": {
      "fontFamily": "Rubik",
      "fontSize": 12,
      "fontWeight": 500
    },
    "caption-8": {
      "fontFamily": "Roboto",
      "fontSize": 12,
      "fontWeight": 400,
      "letterSpacing": 0.20000000298023224
    },
    "caption-9": {
      "fontFamily": "Roboto",
      "fontSize": 12,
      "fontWeight": 400
    },
    "caption-10": {
      "fontFamily": "Rubik",
      "fontSize": 12,
      "fontWeight": 400,
      "lineHeight": 20,
      "letterSpacing": 0.20000000298023224
    },
    "caption-11": {
      "fontFamily": "Google Sans Flex",
      "fontSize": 12,
      "fontWeight": 500,
      "lineHeight": 16,
      "letterSpacing": 0.10000000149011612
    },
    "caption-12": {
      "fontFamily": "Roboto",
      "fontSize": 12,
      "fontWeight": 500
    },
    "caption-13": {
      "fontFamily": "Rubik",
      "fontSize": 12,
      "fontWeight": 400,
      "letterSpacing": 0.4000000059604645
    },
    "caption-14": {
      "fontFamily": "Google Sans Flex",
      "fontSize": 12,
      "fontWeight": 500,
      "lineHeight": 16
    },
    "caption-15": {
      "fontFamily": "Rubik",
      "fontSize": 12,
      "fontWeight": 400,
      "lineHeight": 18,
      "letterSpacing": -0.150390625
    },
    "caption-16": {
      "fontFamily": "Roboto",
      "fontSize": 12,
      "fontWeight": 500,
      "letterSpacing": 4
    },
    "caption-17": {
      "fontFamily": "Rubik",
      "fontSize": 12,
      "fontWeight": 500,
      "lineHeight": 16
    },
    "caption-18": {
      "fontFamily": "Rubik",
      "fontSize": 12,
      "fontWeight": 400,
      "lineHeight": 16,
      "letterSpacing": 2
    },
    "caption-19": {
      "fontFamily": "Rubik",
      "fontSize": 12,
      "fontWeight": 500,
      "lineHeight": 17
    },
    "caption-20": {
      "fontFamily": "Rubik",
      "fontSize": 12,
      "fontWeight": 400,
      "lineHeight": 14
    },
    "caption-21": {
      "fontFamily": "Roboto",
      "fontSize": 12,
      "fontWeight": 500,
      "lineHeight": 20
    },
    "caption-22": {
      "fontFamily": "Roboto",
      "fontSize": 12,
      "fontWeight": 400,
      "lineHeight": 16,
      "letterSpacing": 0.20000000298023224
    },
    "caption-23": {
      "fontFamily": "Roboto",
      "fontSize": 12,
      "fontWeight": 400,
      "lineHeight": 17,
      "letterSpacing": 0.20000000298023224
    },
    "caption-24": {
      "fontFamily": "Roboto",
      "fontSize": 12,
      "fontWeight": 400,
      "lineHeight": 17,
      "letterSpacing": 0.4000000059604645
    },
    "caption-25": {
      "fontFamily": "Roboto",
      "fontSize": 12,
      "fontWeight": 500,
      "lineHeight": 17
    },
    "caption-26": {
      "fontFamily": "Rubik",
      "fontSize": 11.5,
      "fontWeight": 400,
      "lineHeight": 19
    },
    "caption-27": {
      "fontFamily": "Google Sans Flex",
      "fontSize": 10.621980667114258,
      "fontWeight": 500,
      "lineHeight": 12.139406204223633
    },
    "caption-28": {
      "fontFamily": "Rubik",
      "fontSize": 10.5,
      "fontWeight": 300,
      "lineHeight": 18
    },
    "caption-29": {
      "fontFamily": "Rubik",
      "fontSize": 10,
      "fontWeight": 400,
      "lineHeight": 12,
      "letterSpacing": 0.6000000238418579
    },
    "caption-30": {
      "fontFamily": "Rubik",
      "fontSize": 10,
      "fontWeight": 500,
      "lineHeight": 12,
      "letterSpacing": 0.2666666805744171
    },
    "caption-31": {
      "fontFamily": "Google Sans Flex",
      "fontSize": 10,
      "fontWeight": 400,
      "lineHeight": 12,
      "letterSpacing": 0.20000000298023224
    },
    "caption-32": {
      "fontFamily": "Rubik",
      "fontSize": 10,
      "fontWeight": 400
    },
    "caption-33": {
      "fontFamily": "Google Sans Flex",
      "fontSize": 10,
      "fontWeight": 400,
      "lineHeight": 14
    },
    "caption-34": {
      "fontFamily": "Rubik",
      "fontSize": 10,
      "fontWeight": 600,
      "lineHeight": 14
    },
    "caption-35": {
      "fontFamily": "Rubik",
      "fontSize": 10,
      "fontWeight": 500,
      "lineHeight": 16
    },
    "caption-36": {
      "fontFamily": "Arial",
      "fontSize": 10,
      "fontWeight": 400,
      "letterSpacing": 0.6000000238418579
    },
    "caption-37": {
      "fontFamily": "Rubik",
      "fontSize": 10,
      "fontWeight": 400,
      "lineHeight": 12
    },
    "caption-38": {
      "fontFamily": "Roboto",
      "fontSize": 10,
      "fontWeight": 400,
      "lineHeight": 12,
      "letterSpacing": 0.6000000238418579
    },
    "caption-39": {
      "fontFamily": "Roboto",
      "fontSize": 10,
      "fontWeight": 400,
      "lineHeight": 12,
      "letterSpacing": 0.20000000298023224
    },
    "caption-40": {
      "fontFamily": "Roboto",
      "fontSize": 10,
      "fontWeight": 500,
      "letterSpacing": 0.20000000298023224
    },
    "caption-41": {
      "fontFamily": "Rubik",
      "fontSize": 10,
      "fontWeight": 500,
      "lineHeight": 12,
      "letterSpacing": 0.4000000059604645
    },
    "caption-42": {
      "fontFamily": "Rubik",
      "fontSize": 9,
      "fontWeight": 400,
      "lineHeight": 12,
      "letterSpacing": 0.15000000596046448
    },
    "caption-43": {
      "fontFamily": "Rubik",
      "fontSize": 9,
      "fontWeight": 500
    }
  },
  "spacing": {
    "base-unit": 2
  },
  "radius": {
    "radius-sm": "0.5px",
    "radius-md": "0.5867969989776611px",
    "radius-lg": "0.6000000238418579px",
    "radius-lg-2": "1px",
    "radius-lg-3": "1.1735939979553223px",
    "radius-lg-4": "1.363629937171936px",
    "radius-lg-5": "1.5px",
    "radius-lg-6": "2px",
    "radius-lg-7": "2.272716522216797px",
    "radius-lg-8": "2.5px",
    "radius-lg-9": "3px",
    "radius-lg-10": "3.98101806640625px",
    "radius-lg-11": "4px",
    "radius-lg-12": "4.743038177490234px",
    "radius-lg-13": "5px",
    "radius-lg-14": "7.384615421295166px",
    "radius-lg-15": "8px",
    "radius-lg-16": "8.727272033691406px",
    "radius-lg-17": "9.069767951965332px",
    "radius-lg-18": "9.104555130004883px",
    "radius-lg-19": "9.163207054138184px",
    "radius-lg-20": "10px",
    "radius-lg-21": "10.322580337524414px",
    "radius-lg-22": "11px",
    "radius-lg-23": "11.113187789916992px",
    "radius-lg-24": "11.735940933227539px",
    "radius-lg-25": "11.999998092651367px",
    "radius-lg-26": "12px",
    "radius-lg-27": "13px",
    "radius-lg-28": "15.570175170898438px",
    "radius-lg-29": "15.999998092651367px",
    "radius-lg-30": "16px",
    "radius-lg-31": "16.000001907348633px",
    "radius-lg-32": "17.85000228881836px",
    "radius-lg-33": "18px",
    "radius-lg-34": "19.999998092651367px",
    "radius-lg-35": "20px",
    "radius-lg-36": "21.38894271850586px",
    "radius-lg-37": "21.5px",
    "radius-lg-38": "22.5px",
    "radius-lg-39": "24px",
    "radius-lg-40": "25.09000015258789px",
    "radius-lg-41": "25.239437103271484px",
    "radius-lg-42": "27.000003814697266px",
    "radius-lg-43": "28px",
    "radius-lg-44": "29.339847564697266px",
    "radius-lg-45": "30px",
    "radius-lg-46": "30.513442993164062px",
    "radius-lg-47": "31px",
    "radius-lg-48": "32px",
    "radius-lg-49": "34.03422927856445px",
    "radius-lg-50": "35px",
    "radius-lg-51": "36.38142013549805px",
    "radius-lg-52": "38px",
    "radius-lg-53": "40px",
    "radius-lg-54": "40.73500442504883px",
    "radius-lg-55": "44px",
    "radius-lg-56": "60px",
    "radius-lg-57": "80px",
    "radius-lg-58": "99px",
    "radius-lg-59": "100px",
    "radius-lg-60": "116.66667175292969px",
    "radius-lg-61": "120px",
    "radius-full": "999px",
    "radius-full-2": "2100px"
  },
  "shadow": {
    "shadow-1": "0px 0px 8.000000953674316px 0px #0000000a",
    "shadow-2": "0px 2px 2px 0px #f1f1f1",
    "shadow-3": "inset 0px -18px 20px 0px #ffffffdb",
    "shadow-4": "0px 2px 2px 0px #0000000a",
    "shadow-5": "0px 8px 22px -6px #4b494114",
    "shadow-6": "0px 4px 4px 0px #00000040",
    "shadow-7": "0px 0px 8px 0px #00000029",
    "shadow-8": "6px 6px 40.5px 0px #e1cce9",
    "shadow-9": "0px 7.255814075469971px 22.674419403076172px 0px #00000040",
    "shadow-10": "0px 0px 6px 0px #00000075",
    "shadow-11": "0px 8px 24px 0px #0000003d",
    "shadow-12": "0px 14px 64px -4px #4b494114",
    "shadow-13": "0px 0px 16px 0px #00000014",
    "shadow-14": "0px -1px 16px 0px #00000029",
    "shadow-15": "-2px 2px 32px 0px #0000000a",
    "shadow-16": "0px 0px 8px 0px #0000001a",
    "shadow-17": "0px 0px 10px 0px #00000073",
    "shadow-18": "0px 0px 8px 0px #00000014",
    "shadow-19": "0px 2px 2px 0px #f5f5f5",
    "shadow-20": "0px 2px 8px 0px #00000029",
    "shadow-21": "0px 1.5438778400421143px 3.0877556800842285px -1.5438778400421143px #0000001a",
    "shadow-22": "0px 3.0877556800842285px 4.631633281707764px -0.7719389200210571px #0000001a",
    "shadow-23": "0px 3.692307710647583px 14.769230842590332px 0px #0000003d",
    "shadow-24": "0px 4px 4px 0px #c1bfbf40",
    "shadow-25": "0px 2px 4px 0px #00000033",
    "shadow-26": "0.5px 0px 0px 0px #000000",
    "shadow-27": "inset -0.6000000238418579px -0.6000000238418579px 0.7999999523162842px 0px #00000033",
    "shadow-28": "inset 0.6000000238418579px 0.6000000238418579px 0.3999999761581421px 0px #ffffff40",
    "shadow-29": "0px 4px 9.399999618530273px 0px #eaf2ff",
    "shadow-30": "0px 4px 9.399999618530273px 0px #f0f0ff",
    "shadow-31": "inset 0px 0px 2px 0px #00000014",
    "shadow-32": "0px -2px 8px 0px #f5f5f5",
    "shadow-33": "inset -0.4800000488758087px -0.4800000488758087px 0.64000004529953px 0px #00000033",
    "shadow-34": "inset 0.4800000488758087px 0.4800000488758087px 0.320000022649765px 0px #ffffff40",
    "shadow-35": "0px 2px 24px 0px #00000040",
    "shadow-36": "inset -0.5760000944137573px -0.5760000944137573px 0.768000066280365px 0px #00000033",
    "shadow-37": "inset 0.5760000944137573px 0.5760000944137573px 0.3840000331401825px 0px #ffffff40",
    "shadow-38": "0px 4px 14px 0px #00000008",
    "shadow-39": "0px 2px 8px 0px #00000014",
    "shadow-40": "1px 1px 1px 0px #0000007a",
    "shadow-41": "0px 1px 4px 0px #0000003d",
    "shadow-42": "0px 1px 16px 0px #00000029",
    "shadow-43": "0px 6px 0px 0px #ddd9ce",
    "shadow-44": "inset 2px 2px 14px 0px #505050",
    "shadow-45": "inset 2px 2px 2px 0px #525252",
    "shadow-46": "0px 3.999999761581421px 3.999999761581421px 0px #00000040",
    "shadow-47": "0px 3.592982053756714px 6.287718296051025px 0px #c8c8c840",
    "shadow-48": "0px 2.0728743076324463px 3.6275293827056885px 0px #c8c8c840",
    "shadow-49": "0px 5.052631855010986px 8.8421049118042px 0px #c8c8c840",
    "shadow-50": "0px 3.8790628910064697px 6.788360118865967px 0px #c8c8c840",
    "shadow-51": "0px 3.491156816482544px 6.109524250030518px 0px #c8c8c840",
    "shadow-52": "0px 2px 12px 0px #00000014",
    "shadow-53": "0px 2px 5px 0px #0000004d",
    "shadow-54": "0px 2px 12px 0px #00000026",
    "shadow-55": "0px 0px 26px 0px #0000001f",
    "shadow-56": "0px 4px 20px 0px #00000061",
    "shadow-57": "0px 1px 10px 0px #0000001a",
    "shadow-58": "0px 1px 4px 0px #0000001f",
    "shadow-59": "0px 2px 4px 0px #0000001a",
    "shadow-60": "0px 1px 2px 0px #0000000d"
  },
  "fonts": [
    "Rubik",
    "Inter",
    "Product Sans",
    "Google Sans Flex",
    "Roboto",
    "Arial",
    "Mail Sans Roman"
  ],
  "variables": {
    "Collection 1": {
      "modes": [
        "Mode 1"
      ],
      "variables": {
        "Primary": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#c7ff29"
          }
        },
        "BG": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#f3f7ff"
          }
        },
        "Icon 1": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#ee6a5f"
          }
        },
        "Icon 2": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#f5bd4f"
          }
        },
        "Icon 3": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#61c454"
          }
        },
        "Primary BG": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#f9f9f9"
          }
        },
        "Spacing": {
          "type": "FLOAT",
          "values": {
            "Mode 1": 12
          }
        },
        "Spacing 2": {
          "type": "FLOAT",
          "values": {
            "Mode 1": 80
          }
        },
        "CTA Primary hover": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#e2ff91"
          }
        },
        "Deep Black": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#1a1d1c"
          }
        },
        "Card BG": {
          "type": "COLOR",
          "values": {
            "Mode 1": "#fcfafe"
          }
        }
      }
    }
  }
}
```
